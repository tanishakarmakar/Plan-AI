from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    JWTManager(app)
    CORS(app)

    with app.app_context():
        from . import routes  # Import only routes.py
        app.register_blueprint(routes.bp)  # Register the blueprint from routes.py
        db.create_all()
    
    return app
