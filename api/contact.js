const nodemailer = require('nodemailer');

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD
  ? process.env.SENDER_PASSWORD.replace(/\s/g, '')
  : '';
const CONTACT_EMAIL = (process.env.CONTACT_EMAIL || 'contacto@folillabs.com').trim();

function createTicketId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `FOLIL-${date}-${suffix}`;
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function getBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function getTransporter() {
  if (!SENDER_EMAIL || !SENDER_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    requireTLS: SMTP_PORT === 587,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  });
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'GET') {
    sendJson(res, 200, {
      status: 'ok',
      emailConfigured: Boolean(SENDER_EMAIL && SENDER_PASSWORD),
      contactEmail: CONTACT_EMAIL
    });
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { name = '', email = '', company = '' } = await getBody(req);
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanCompany = String(company).trim();

    if (!cleanName || !cleanEmail) {
      sendJson(res, 400, { success: false, error: 'Name and email are required' });
      return;
    }

    const ticketId = createTicketId();
    const transporter = getTransporter();
    if (!transporter) {
      sendJson(res, 500, { success: false, error: 'Email credentials are not configured' });
      return;
    }

    const info = await transporter.sendMail({
      from: `"Folil Labs" <${SENDER_EMAIL}>`,
      replyTo: cleanEmail,
      to: CONTACT_EMAIL,
      subject: `[${ticketId}] Nuevo contacto de ${cleanName}`,
      text: [
        'Nuevo registro en la lista de espera de Folil Labs:',
        '',
        `Ticket: ${ticketId}`,
        `Nombre: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Empresa: ${cleanCompany || '-'}`,
        '',
        'Este mensaje fue enviado desde folillabs.com.'
      ].join('\n')
    });

    console.log('[CONTACT_SENT]', {
      ticketId,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });

    if (!info.accepted || info.accepted.length === 0 || (info.rejected && info.rejected.length > 0)) {
      sendJson(res, 502, { success: false, error: 'Email provider did not accept the message' });
      return;
    }

    let confirmationMessageId = null;

    try {
      const confirmation = await transporter.sendMail({
        from: `"Folil Labs" <${SENDER_EMAIL}>`,
        to: cleanEmail,
        subject: `[${ticketId}] Recibimos tu solicitud en Folil Labs`,
        text: [
          `Hola ${cleanName},`,
          '',
          'Gracias por contactar a Folil Labs.',
          'Recibimos tu solicitud correctamente y la revisaremos personalmente.',
          '',
          `Tu número de seguimiento es: ${ticketId}`,
          '',
          'Te responderemos pronto desde contacto@folillabs.com.',
          '',
          'Equipo Folil Labs'
        ].join('\n')
      });

      confirmationMessageId = confirmation.messageId;
      console.log('[CONFIRMATION_SENT]', {
        ticketId,
        messageId: confirmation.messageId,
        accepted: confirmation.accepted,
        rejected: confirmation.rejected
      });
    } catch (confirmationError) {
      console.error('[CONFIRMATION_ERROR]', confirmationError);
    }

    sendJson(res, 200, {
      success: true,
      ticketId,
      messageId: info.messageId,
      confirmationMessageId
    });
  } catch (error) {
    console.error('[CONTACT_ERROR]', error);
    sendJson(res, 500, { success: false, error: 'Could not send email' });
  }
};
