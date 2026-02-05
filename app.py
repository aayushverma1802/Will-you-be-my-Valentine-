from flask import Flask, render_template
import os

# Flask app - Vercel will serve static files from public/ automatically
app = Flask(__name__, 
            static_folder=None,  # Disable Flask static serving - let Vercel handle it
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
