from flask import Flask, render_template, send_from_directory
import os

# Flask app - serves static files from static/ folder
app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

# Explicit route for static files (needed for Vercel serverless)
@app.route('/static/<path:path>')
def serve_static(path):
    # Get absolute path to static directory
    # Works in both local development and Vercel serverless
    static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
    return send_from_directory(static_dir, path)

if __name__ == '__main__':
    app.run(debug=True)
