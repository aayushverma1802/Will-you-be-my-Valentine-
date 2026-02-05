from flask import Flask, render_template

# Flask app - serves static files from static/ folder
app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

# Explicit route for static files (needed for Vercel)
# Flask's built-in static serving may not work correctly on Vercel serverless
@app.route('/static/<path:path>')
def serve_static(path):
    return app.send_static_file(path)

if __name__ == '__main__':
    app.run(debug=True)
