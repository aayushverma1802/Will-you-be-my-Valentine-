from flask import Flask, render_template, send_from_directory
import os

# Flask app - static files served by Vercel from public/ directory
# For local dev, Flask serves from static/ folder
app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

# Serve static files for local development only
# On Vercel, files in public/ are served automatically by CDN
@app.route('/static/<path:path>')
def serve_static(path):
    # Check if we're on Vercel (public/static exists) or local (static/ exists)
    public_static = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public', 'static')
    local_static = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
    
    # On Vercel, public/static files are served by CDN, so this shouldn't be called
    # But keep it for local development fallback
    if os.path.exists(local_static):
        return send_from_directory(local_static, path)
    elif os.path.exists(public_static):
        return send_from_directory(public_static, path)
    return "File not found", 404

if __name__ == '__main__':
    app.run(debug=True)
