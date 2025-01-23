### app.py
from flask import Flask, Blueprint, request, jsonify, session
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, request, jsonify, session

# Configuration for database connection
def get_connection():
    """
    Establish a connection to the MySQL database.
    """
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Liku@123#",
            database="school_ma",
            auth_plugin='mysql_native_password'
        )
        print("Database connected!")
        return connection
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
        raise

# Blueprint for user routes
user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/admin/login', methods=['POST'])
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

        # Ensure the user is an admin (type inferred from the route)
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

@user_routes.route('/admin/signup', methods=['POST'])
def signup_admin():
    data = request.json
    email = data.get('email')
    mobile_no = data.get('mobile_no')
    roll_no = data.get('roll_no')
    password = data.get('password')
    user_type = 'Admin'  # Inferred from the route

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

# Main Flask app
app = Flask(__name__)
app.secret_key = "126945c1bdc73d55bb3d364aed2611f8"
CORS(app)  # Enable CORS to allow communication with the React app

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api')

@app.route('/')
def home():
    return "Welcome to the Flask Application!"

if __name__ == '__main__':
    app.run(debug=True)

