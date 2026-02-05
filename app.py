from flask import Flask, render_template, send_from_directory
import os

# Flask app with explicit static folder configuration
app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

# Serve static files explicitly for Vercel
@app.route('/static/<path:path>')
def serve_static(path):
    # Try public/static first (Vercel), then static/ (local)
    if os.path.exists(os.path.join('public', 'static', path)):
        return send_from_directory('public/static', path)
    elif os.path.exists(os.path.join('static', path)):
        return send_from_directory('static', path)
    return "File not found", 404

if __name__ == '__main__':
    app.run(debug=True)
