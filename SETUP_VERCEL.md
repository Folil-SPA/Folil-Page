# Setup en Vercel

## Variables de entorno

Configura estas variables en Vercel Project Settings > Environment Variables:

```env
SENDER_EMAIL=tu_email@gmail.com
SENDER_PASSWORD=tu_app_password_de_google
CONTACT_EMAIL=contacto@folillabs.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

`SENDER_PASSWORD` debe ser una contraseña de app de Google, no la contraseña normal de Gmail.

## Endpoints

- Sitio: `/`
- Formulario: `/api/contact`
- Health check: `GET /api/contact`

## Deploy

```bash
vercel --prod
```
