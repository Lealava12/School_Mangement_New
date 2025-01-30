from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from config import get_connection

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
        check_user_query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(check_user_query, (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Admin not registered! Please sign up."}), 401

        if user.get('type').lower() != 'admin':
            return jsonify({"error": "Access denied! Only admins can log in."}), 403

        if check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['user_type'] = user['type']
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
    user_type = 'Admin'

    if not all([email, mobile_no, roll_no, password]):
        return jsonify({"error": "All fields are required!"}), 400

    connection = get_connection()
    cursor = connection.cursor()
    try:
        check_query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(check_query, (email,))
        if cursor.fetchone():
            return jsonify({"error": "Email already registered!"}), 409

        hashed_password = generate_password_hash(password)
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

@user_routes.route('/admin/Teachers', methods=['GET', 'POST'])
def manage_teachers():
    if request.method == 'GET':
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM Teachers")
            Teachers = cursor.fetchall()
            return jsonify(Teachers), 200
        except Exception as e:
            return jsonify({"error": f"Failed to fetch Teachers: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

    elif request.method == 'POST':
        data = request.json
        required_fields = ['name', 'email', 'mobile', 'joining_date', 'subject', 'class', 'gender']
        if not all(data.get(field) for field in required_fields):
            return jsonify({"error": "All fields are required!"}), 400

        connection = get_connection()
        cursor = connection.cursor()
        try:
            insert_query = """
                INSERT INTO Teachers (name, email, mobile, joining_date, subject, class, gender)
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

@user_routes.route('/Teachers/<int:id>', methods=['PUT'])
def update_teacher(id):
    data = request.json
    required_fields = ['name', 'email', 'mobile', 'joining_date', 'subject', 'class', 'gender']
    if not all(data.get(field) for field in required_fields):
        return jsonify({"error": "All fields are required!"}), 400

    connection = get_connection()
    cursor = connection.cursor()
    try:
        query = """
            UPDATE Teachers
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

@user_routes.route('/Teachers/<int:id>', methods=['DELETE'])
def delete_teacher(id):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        query = "DELETE FROM Teachers WHERE id = %s"
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
        session.clear()
        return jsonify({"message": "Logout successful!"}), 200
    except Exception as e:
        print(f"Error during logout: {e}")
        return jsonify({"error": "An error occurred during logout.", "redirect": "./Signin.js"}), 500
    
## Admin Student Page
@user_routes.route('/admin/Students', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_students():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        if request.method == 'GET':
            # Add filtering parameters
            class_filter = request.args.get('class')
            section_filter = request.args.get('section')
            roll_no_filter = request.args.get('roll_no')

            base_query = "SELECT * FROM Students"
            params = []
            conditions = []       

            if class_filter:
                conditions.append("class = %s")
                params.append(class_filter)
            if section_filter:
                conditions.append("section = %s")
                params.append(section_filter)
            if roll_no_filter:
                conditions.append("roll_no = %s")
                params.append(roll_no_filter)

            if conditions:
                base_query += " WHERE " + " AND ".join(conditions)

            cursor.execute(base_query, params)
            students = cursor.fetchall()
            return jsonify(students), 200

        elif request.method == 'POST':
            data = request.json
            required_fields = [
                'name', 'dob', 'class', 'section', 'gender', 'roll_no',
                'father_name', 'mother_name', 'email', 'mobile', 'address'
            ]
            
            if not all(field in data for field in required_fields):
                return jsonify({"error": "All fields are required!"}), 400

            # Check for existing student
            cursor.execute("""
                SELECT id FROM Students 
                WHERE class = %s AND roll_no = %s
            """, (data['class'], data['roll_no']))
            
            if cursor.fetchone():
                return jsonify({"error": "Student with this class and roll number already exists!"}), 409

            cursor.execute("""
                INSERT INTO Students (
                    name, dob, class, section, gender, roll_no,
                    father_name, mother_name, email, mobile, address
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                data['name'], data['dob'], data['class'], data['section'],
                data['gender'], data['roll_no'], data['father_name'],
                data['mother_name'], data['email'], data['mobile'], data['address']
            ))
            connection.commit()
            return jsonify({"message": "Student created successfully!"}), 201

        elif request.method == 'PUT':
            data = request.json
            if 'id' not in data:
                return jsonify({"error": "Student ID is required for update"}), 400

            # Check for class/roll_no conflict
            cursor.execute("""
                SELECT id FROM Students 
                WHERE class = %s AND roll_no = %s AND id != %s
            """, (data['class'], data['roll_no'], data['id']))
            
            if cursor.fetchone():
                return jsonify({"error": "Another student already has this class and roll number!"}), 409

            cursor.execute("""
                UPDATE Students SET
                    name = %s,
                    dob = %s,
                    class = %s,
                    section = %s,
                    gender = %s,
                    roll_no = %s,
                    father_name = %s,
                    mother_name = %s,
                    email = %s,
                    mobile = %s,
                    address = %s
                WHERE id = %s
            """, (
                data['name'], data['dob'], data['class'], data['section'],
                data['gender'], data['roll_no'], data['father_name'],
                data['mother_name'], data['email'], data['mobile'],
                data['address'], data['id']
            ))
            connection.commit()
            return jsonify({"message": "Student updated successfully!"}), 200

        elif request.method == 'DELETE':
            student_id = request.args.get('id')
            if not student_id:
                return jsonify({"error": "Student ID is required"}), 400

            # Check for existing fee records
            cursor.execute("""
                SELECT id FROM Fees 
                WHERE student_id = %s
            """, (student_id,))
            
            if cursor.fetchone():
                return jsonify({
                    "error": "Cannot delete student with existing fee records! Delete fee records first."
                }), 409

            cursor.execute("DELETE FROM Students WHERE id = %s", (student_id,))
            connection.commit()
            return jsonify({"message": "Student deleted successfully!"}), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@user_routes.route('/admin/Fee', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_fee():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        if request.method == 'GET':
            # Get query parameters for filtering
            class_filter = request.args.get('class')
            payment_date = request.args.get('payment_date')

            base_query = """
                SELECT s.id as student_id, s.name, s.class, s.roll_no, 
                       f.amount, f.payment_mode, f.payment_date, f.receipt_no
                FROM Students s
                JOIN Fees f ON s.id = f.student_id
            """
            params = []
            
            conditions = []
            if class_filter:
                conditions.append("s.class = %s")
                params.append(class_filter)
            if payment_date:
                conditions.append("DATE(f.payment_date) = %s")
                params.append(payment_date)
            
            if conditions:
                base_query += " WHERE " + " AND ".join(conditions)

            cursor.execute(base_query, params)
            fee_records = cursor.fetchall()
            return jsonify(fee_records), 200

        elif request.method == 'POST':
            data = request.json
            required_fields = [
                'name', 'class', 'roll_no', 'amount',
                'payment_mode', 'payment_date', 'receipt_no'
            ]
            
            if not all(field in data for field in required_fields):
                return jsonify({"error": "All fields are required!"}), 400

            # First find the student
            cursor.execute("""
                SELECT id FROM Students 
                WHERE name = %s AND class = %s AND roll_no = %s
            """, (data['name'], data['class'], data['roll_no']))
            
            student = cursor.fetchone()
            if not student:
                return jsonify({"error": "Student not found!"}), 404

            # Insert fee record
            cursor.execute("""
                INSERT INTO Fees (
                    student_id, amount, payment_mode, 
                    payment_date, receipt_no
                ) VALUES (%s, %s, %s, %s, %s)
            """, (
                student['id'], data['amount'], data['payment_mode'],
                data['payment_date'], data['receipt_no']
            ))
            
            connection.commit()
            return jsonify({"message": "Fee record created successfully!"}), 201

        elif request.method == 'PUT':
            data = request.json
            if 'receipt_no' not in data:
                return jsonify({"error": "Receipt number is required for update"}), 400

            cursor.execute("""
                UPDATE Fees SET
                    amount = %s,
                    payment_mode = %s,
                    payment_date = %s
                WHERE receipt_no = %s
            """, (
                data['amount'], data['payment_mode'],
                data['payment_date'], data['receipt_no']
            ))
            
            connection.commit()
            return jsonify({"message": "Fee record updated successfully!"}), 200

        elif request.method == 'DELETE':
            receipt_no = request.args.get('receipt_no')
            if not receipt_no:
                return jsonify({"error": "Receipt number is required"}), 400

            cursor.execute("DELETE FROM Fees WHERE receipt_no = %s", (receipt_no,))
            connection.commit()
            return jsonify({"message": "Fee record deleted successfully!"}), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()