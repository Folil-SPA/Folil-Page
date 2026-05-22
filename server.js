const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(express.json());

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD;
const CONTACT_EMAIL = 'contacto@folillabs.com';

console.log('[INIT] SENDER_EMAIL configured:', !!SENDER_EMAIL);
console.log('[INIT] SENDER_PASSWORD configured:', !!SENDER_PASSWORD);

let transporter = null;

if (SENDER_EMAIL && SENDER_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  });
  console.log('[INIT] Email transporter configured');
}

// API routes FIRST
app.post('/api/contact', async (req, res) => {
  try {
    if (!SENDER_EMAIL || !SENDER_PASSWORD || !transporter) {
      return res.status(500).json({ success: false, error: 'Email not configured' });
    }

    const { name, email, company } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    const mailOptions = {
      from: SENDER_EMAIL,
      to: CONTACT_EMAIL,
      subject: `Nuevo contacto de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || '—'}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Static files LAST
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[INIT] Server running on port ${PORT}`);
});
