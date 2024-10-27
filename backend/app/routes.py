from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User
from . import db
import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

bp = Blueprint('main', __name__)

# Homepage Route
@bp.route('/', methods=['GET'])
def homepage():
    return jsonify({'message': 'Welcome to the HomePage!'}), 200

# Register Route
@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully!'}), 201

# Login Route
@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token, 'user': {'username': user.username, 'email': user.email}}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Protected Route (Home)
@bp.route('/home', methods=['GET'])
@jwt_required()
def homepage_main():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Welcome to Plan-AI, {user.username}!'}), 200

# GROQ API Route
@bp.route('/groq-api', methods=['POST'])
def groq_api():
    data = request.json
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))

        chat_completion = client.chat.completions.create(
            messages=data['messages'],
            model=data['model'],
        )

        return jsonify({'message': chat_completion.choices[0].message.content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Add any additional routes here
@bp.route('/main', methods=['GET'])
@jwt_required()  # Ensure the route is protected by JWT
def main():
    current_user_id = get_jwt_identity()  # Get the user identity from the token
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Welcome to the Main Page, {user.username}!'}), 200