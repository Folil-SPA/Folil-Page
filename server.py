from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Variables de entorno (configurar en Render dashboard)
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'tu_email@gmail.com')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', 'tu_password')
CONTACT_EMAIL = 'contacto@folillabs.com'

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        company = data.get('company', '').strip()

        if not name or not email:
            return jsonify({'error': 'Name and email are required'}), 400

        # Construir el email
        subject = f"Nuevo contacto de {name}" if company else f"Nuevo contacto de {name}"
        body = f"""
Nuevo registro en la lista de espera de Folil Labs:

Nombre: {name}
Email: {email}
Empresa: {company if company else '—'}

---
Este es un email automático del formulario de contacto.
"""

        # Enviar email
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = CONTACT_EMAIL
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        return jsonify({'success': True, 'message': 'Email sent successfully'}), 200

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return send_from_directory('.', 'index.html')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 8080)), debug=False)
