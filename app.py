from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

# Serve static files explicitly for Vercel
@app.route('/static/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('static', path)
    except Exception as e:
        # Fallback: try to serve from absolute path
        static_path = os.path.join(os.path.dirname(__file__), 'static', path)
        if os.path.exists(static_path):
            return send_from_directory(os.path.join(os.path.dirname(__file__), 'static'), path)
        return str(e), 404

# Vercel serverless function handler
def handler(request):
    return app(request.environ, lambda status, headers: None)

if __name__ == '__main__':
    app.run(debug=True)
