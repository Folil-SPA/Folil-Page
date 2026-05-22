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

    await transporter.sendMail({
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

    return res.json({ success: true });
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
