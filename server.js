const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD
  ? process.env.SENDER_PASSWORD.replace(/\s/g, '')
  : '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contacto@folillabs.com';

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = new Set([
    'https://folil-labs.onrender.com',
    'https://srv-d7v45ibeo5us73eaocr0.onrender.com'
  ]);
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

console.log('[INIT] Mail settings', {
  smtpHost: SMTP_HOST,
  smtpPort: SMTP_PORT,
  senderEmailConfigured: Boolean(SENDER_EMAIL),
  senderPasswordConfigured: Boolean(SENDER_PASSWORD),
  contactEmail: CONTACT_EMAIL
});

function getTransporter() {
  if (!SENDER_EMAIL || !SENDER_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  });
}

app.post('/api/contact', async (req, res) => {
  try {
    console.log('[CONTACT_REQUEST]', {
      hasName: Boolean(req.body && req.body.name),
      hasEmail: Boolean(req.body && req.body.email),
      contactEmail: CONTACT_EMAIL
    });

    const { name = '', email = '', company = '' } = req.body || {};
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanCompany = String(company).trim();

    if (!cleanName || !cleanEmail) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const transporter = getTransporter();
    if (!transporter) {
      return res.status(500).json({ success: false, error: 'Email credentials are not configured' });
    }

    const info = await transporter.sendMail({
      from: `"Folil Labs" <${SENDER_EMAIL}>`,
      replyTo: cleanEmail,
      to: CONTACT_EMAIL,
      subject: `Nuevo contacto de ${cleanName}`,
      text: [
        'Nuevo registro en la lista de espera de Folil Labs:',
        '',
        `Nombre: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Empresa: ${cleanCompany || '-'}`,
        '',
        'Este mensaje fue enviado desde folillabs.com.'
      ].join('\n')
    });

    console.log('[CONTACT_SENT]', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });

    if (!info.accepted || info.accepted.length === 0 || (info.rejected && info.rejected.length > 0)) {
      return res.status(502).json({
        success: false,
        error: 'Email provider did not accept the message'
      });
    }

    return res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('[CONTACT_ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Could not send email'
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    emailConfigured: Boolean(SENDER_EMAIL && SENDER_PASSWORD),
    contactEmail: CONTACT_EMAIL
  });
});

app.use(express.static(__dirname));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[INIT] Folil Labs server running on port ${PORT}`);
    console.log(`[INIT] Email configured: ${Boolean(SENDER_EMAIL && SENDER_PASSWORD)}`);
  });
}

module.exports = app;
