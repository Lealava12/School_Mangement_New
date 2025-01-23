from flask import Blueprint, request, jsonify, session
from config import get_connection
from werkzeug.security import generate_password_hash, check_password_hash

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/api/admin/login', methods=['POST'])
def login_admin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required!"}), 400

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        # Query to fetch user details
        check_user_query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(check_user_query, (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Admin not registered! Please sign up."}), 401

        # Ensure the user is an admin
        if user.get('type').lower() != 'admin':
            return jsonify({"error": "Access denied! Only admins can log in."}), 403

        # Check if the password matches
        if check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['user_type'] = user['type']  # Store user type in session
            return jsonify({
                "message": "Login successful!",
                "user": {"id": user['id'], "email": user['email'], "type": user['type']}
            }), 200
        else:
            return jsonify({"error": "Incorrect password!"}), 401
    finally:
        cursor.close()
        connection.close()

@user_routes.route('/api/admin/signup', methods=['POST'])
def signup_admin():
    data = request.json
    email = data.get('email')
    mobile_no = data.get('mobile_no')
    roll_no = data.get('roll_no')
    password = data.get('password')
    user_type = 'admin'  # Set user type explicitly for admin

    # Check for required fields
    if not all([email, mobile_no, roll_no, password]):
        return jsonify({"error": "All fields are required!"}), 400

    connection = get_connection()
    cursor = connection.cursor()
    try:
        # Check if the email is already registered
        check_query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(check_query, (email,))
        if cursor.fetchone():
            return jsonify({"error": "Email already registered!"}), 409

        # Hash the password before storing it
        hashed_password = generate_password_hash(password)

        # Insert the new user into the database
        insert_query = """
            INSERT INTO users (email, mobile_no, roll_no, password, type) 
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (email, mobile_no, roll_no, hashed_password, user_type))
        connection.commit()
        return jsonify({"message": "Admin registered successfully!"}), 201
    finally:
        cursor.close()
        connection.close()
