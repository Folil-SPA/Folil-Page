from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
import os
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Variables de entorno (configurar en Render dashboard)
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')
CONTACT_EMAIL = 'contacto@folillabs.com'

print(f"[INIT] SMTP_SERVER: {SMTP_SERVER}", file=sys.stderr)
print(f"[INIT] SMTP_PORT: {SMTP_PORT}", file=sys.stderr)
print(f"[INIT] SENDER_EMAIL: {SENDER_EMAIL if SENDER_EMAIL else 'NOT SET'}", file=sys.stderr)
print(f"[INIT] SENDER_PASSWORD: {'SET' if SENDER_PASSWORD else 'NOT SET'}", file=sys.stderr)

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        if not SENDER_EMAIL or not SENDER_PASSWORD:
            return jsonify({'error': 'Email credentials not configured'}), 500

        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        company = data.get('company', '').strip()

        if not name or not email:
            return jsonify({'error': 'Name and email are required'}), 400

        print(f"[CONTACT] Sending email from {email} ({name})", file=sys.stderr)

        subject = f"Nuevo contacto de {name}"
        body = f"Nombre: {name}\nEmail: {email}\nEmpresa: {company or '—'}"

        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = CONTACT_EMAIL
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        print(f"[CONTACT] Connecting to {SMTP_SERVER}:{SMTP_PORT}", file=sys.stderr)
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"[CONTACT] Email sent successfully", file=sys.stderr)
        return jsonify({'success': True}), 200

    except Exception as e:
        print(f"[ERROR] {str(e)}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    try:
        return send_from_directory('.', 'index.html')
    except Exception as e:
        print(f"[ERROR] Failed to serve index.html: {e}", file=sys.stderr)
        return jsonify({'error': 'index.html not found'}), 404

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

@app.route('/api/debug', methods=['GET'])
def debug():
    return jsonify({
        'smtp_server': SMTP_SERVER,
        'smtp_port': SMTP_PORT,
        'sender_email_configured': SENDER_EMAIL is not None,
        'sender_password_configured': SENDER_PASSWORD is not None,
        'contact_email': CONTACT_EMAIL
    }), 200

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('.', path)
    except:
        return jsonify({'error': f'File {path} not found'}), 404

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    print(f"[INIT] Starting server on port {port}", file=sys.stderr)
    app.run(host='0.0.0.0', port=port, debug=False)
