from flask import Flask
from flask_cors import CORS
from app.routes.helloRoute import hello_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(hello_bp, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
