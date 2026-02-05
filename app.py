from flask import Flask, render_template, send_from_directory
import os

# Use both static and public folders - Flask serves from static, Vercel serves from public
app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

# Serve static files from both locations for compatibility
@app.route('/static/<path:path>')
def serve_static(path):
    # Try public first (Vercel), then fallback to static (local dev)
    public_path = os.path.join('public', 'static', path)
    static_path = os.path.join('static', path)
    
    if os.path.exists(public_path):
        return send_from_directory('public/static', path)
    elif os.path.exists(static_path):
        return send_from_directory('static', path)
    else:
        return f"File not found: {path}", 404

if __name__ == '__main__':
    app.run(debug=True)
