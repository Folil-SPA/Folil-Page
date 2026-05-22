# Setup Backend en Render

## 1. Preparar credenciales de Gmail

### Opción A: App Password (recomendado)
1. Ir a https://myaccount.google.com/security
2. Activar "Verificación en dos pasos"
3. En "Contraseñas de aplicación" generar una contraseña para "Mail"
4. Copiar la contraseña (16 caracteres)

### Opción B: Contraseña normal (menos seguro)
Usar directamente tu contraseña de Gmail

## 2. Configurar en Render

1. Ir a tu servicio en Render dashboard
   - URL: https://dashboard.render.com/static/srv-d7v45ibeo5us73eaocr0

2. En **Environment**, agregar variables:
   ```
   SMTP_SERVER = smtp.gmail.com
   SMTP_PORT = 587
   SENDER_EMAIL = tu_email@gmail.com
   SENDER_PASSWORD = tu_app_password_de_16_caracteres
   ```

3. Deploy (push a main o redeployar manualmente desde Render)

## 3. Verificar que funcione

```bash
curl https://srv-d7v45ibeo5us73eaocr0.onrender.com/health
```

Debería responder: `{"status":"ok"}`

## 4. Probar el formulario

- Llenar el formulario en la página
- Debería llegar un email a contacto@folillabs.com

## Alternativa: Usar otro proveedor SMTP

### Brevo (ex Sendinblue)
```
SMTP_SERVER = smtp-relay.brevo.com
SMTP_PORT = 587
SENDER_EMAIL = tu_email@brevo.com
SENDER_PASSWORD = tu_api_key
```

### SendGrid
```
SMTP_SERVER = smtp.sendgrid.net
SMTP_PORT = 587
SENDER_EMAIL = apikey (literal)
SENDER_PASSWORD = SG.xxxxx (tu API key)
```

## Troubleshooting

- Si no llegan emails: Revisar logs en Render dashboard
- Error 535: Credenciales incorrectas
- Error de conexión: Verificar SMTP_SERVER y SMTP_PORT
