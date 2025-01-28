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
                "redirect": "./Teacherm",
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

@user_routes.route('/admin/teacher', methods=['GET', 'POST'])
def manage_teachers():
    if request.method == 'GET':
        # Fetch all teachers
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM teachers")
            teachers = cursor.fetchall()
            return jsonify(teachers), 200
        except Exception as e:
            return jsonify({"error": f"Failed to fetch teachers: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

    elif request.method == 'POST':
        # Add a new teacher
        data = request.json
        required_fields = ['name', 'email', 'mobile', 'joining_date', 'subject', 'class', 'gender']
        if not all(data.get(field) for field in required_fields):
            return jsonify({"error": "All fields are required!"}), 400

        connection = get_connection()
        cursor = connection.cursor()
        try:
            insert_query = """
                INSERT INTO teachers (name, email, mobile, joining_date, subject, class, gender)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                data['name'], data['email'], data['mobile'], 
                data['joining_date'], data['subject'], 
                data['class'], data['gender']
            ))
            connection.commit()
            return jsonify({"message": "Teacher added successfully!"}), 201
        except Exception as e:
            return jsonify({"error": f"Failed to add teacher: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

@user_routes.route('/teachers/<int:id>', methods=['PUT'])
def update_teacher(id):
    data = request.json
    required_fields = ['name', 'email', 'mobile', 'joining_date', 'subject', 'class', 'gender']
    if not all(data.get(field) for field in required_fields):
        return jsonify({"error": "All fields are required!"}), 400

    connection = get_connection()
    cursor = connection.cursor()
    try:
        query = """
            UPDATE teachers
            SET name = %s, email = %s, mobile = %s, joining_date = %s, subject = %s, class = %s, gender = %s
            WHERE id = %s
        """
        cursor.execute(query, (
            data['name'], data['email'], data['mobile'], 
            data['joining_date'], data['subject'], 
            data['class'], data['gender'], id
        ))
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Teacher not found!"}), 404
        return jsonify({"message": "Teacher updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to update teacher: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()

@user_routes.route('/teachers/<int:id>', methods=['DELETE'])
def delete_teacher(id):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        query = "DELETE FROM teachers WHERE id = %s"
        cursor.execute(query, (id,))
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Teacher not found!"}), 404
        return jsonify({"message": "Teacher deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to delete teacher: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()
@user_routes.route('/admin/logout', methods=['POST'])
def logout_admin():
    try:
        session.clear()  # Clears all session data
        return jsonify({"message": "Logout successful!"}), 200
    except Exception as e:
        print(f"Error during logout: {e}")  # Log the error for debugging
        return jsonify({"error": "An error occurred during logout.", "redirect": "./Signin.js"}), 500

# Main Flask app
app = Flask(__name__)
app.secret_key = "126945c1bdc73d55bb3d364aed2611f8"
CORS(app)  # Enable CORS to allow communication with the React app

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api')

@app.route('/')
def home():
    """
    Serve a simple home page or message at the root endpoint.
    """
    return jsonify({"message": "Welcome to the School Management System API!"})

if __name__ == '__main__':
    app.run(debug=True)

