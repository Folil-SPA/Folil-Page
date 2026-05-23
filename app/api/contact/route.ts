import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD
  ? process.env.SENDER_PASSWORD.replace(/\s/g, "")
  : "";
const CONTACT_EMAIL = (process.env.CONTACT_EMAIL || "contacto@folillabs.com").trim();

function getTransporter() {
  if (!SENDER_EMAIL || !SENDER_PASSWORD) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    requireTLS: SMTP_PORT === 587,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: SENDER_EMAIL, pass: SENDER_PASSWORD },
  });
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    emailConfigured: Boolean(SENDER_EMAIL && SENDER_PASSWORD),
    contactEmail: CONTACT_EMAIL,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name = "", email = "", company = "" } = await req.json();
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanCompany = String(company).trim();

    if (!cleanName || !cleanEmail) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    if (!transporter) {
      return NextResponse.json(
        { success: false, error: "Email credentials are not configured" },
        { status: 500 }
      );
    }

    const info = await transporter.sendMail({
      from: `"Folil Labs" <${SENDER_EMAIL}>`,
      replyTo: cleanEmail,
      to: CONTACT_EMAIL,
      subject: `Nuevo contacto de ${cleanName}`,
      text: [
        "Nuevo registro en la lista de espera de Folil Labs:",
        "",
        `Nombre: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Empresa: ${cleanCompany || "-"}`,
        "",
        "Este mensaje fue enviado desde folillabs.com.",
      ].join("\n"),
    });

    console.log("[CONTACT_SENT]", { messageId: info.messageId, accepted: info.accepted });

    if (!info.accepted?.length || info.rejected?.length) {
      return NextResponse.json(
        { success: false, error: "Email provider did not accept the message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("[CONTACT_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Could not send email" },
      { status: 500 }
    );
  }
}
