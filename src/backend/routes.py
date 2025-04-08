from flask import Blueprint, request, jsonify, session, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from config import get_connection
from flask_cors import CORS, cross_origin  # Add cross_origin import
import os
from werkzeug.utils import secure_filename

user_routes = Blueprint('user_routes', __name__)

# Remove duplicate CORS setup and use a single configuration
CORS(user_routes, supports_credentials=True, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

UPLOAD_FOLDER = 'uploads'  # Define the folder to store uploaded files
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'docx'}  # Allowed file extensions

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_routes.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400


@user_routes.route('/admin/Teachers', methods=['GET', 'POST'])
def manage_teachers():
    if request.method == 'GET':
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT teacher_id, name, email, mobile, joining_date, subject, class, gender FROM Teachers")
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
            
            # Retrieve the auto-generated teacher_id
            teacher_id_query = "SELECT teacher_id FROM Teachers WHERE auto_id = LAST_INSERT_ID()"
            cursor.execute(teacher_id_query)
            teacher_id = cursor.fetchone()[0]
            
            return jsonify({"message": "Teacher added successfully!", "teacher_id": teacher_id}), 201
        except Exception as e:
            return jsonify({"error": f"Failed to add teacher: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

@user_routes.route('/Teachers/<int:auto_id>', methods=['PUT'])
def update_teacher(auto_id):
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
            WHERE auto_id = %s
        """
        cursor.execute(query, (
            data['name'], data['email'], data['mobile'],
            data['joining_date'], data['subject'],
            data['class'], data['gender'], auto_id
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

@user_routes.route('/Teachers/<int:auto_id>', methods=['DELETE'])
def delete_teacher(auto_id):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        query = "DELETE FROM Teachers WHERE auto_id = %s"
        cursor.execute(query, (auto_id,))
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Teacher not found!"}), 404
        return jsonify({"message": "Teacher deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to delete teacher: {str(e)}"}), 500
    finally:
        cursor.close()
        connection.close()

@user_routes.route('/admin/Students', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_students():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        if request.method == 'GET':
            # Add filtering parameters
            class_filter = request.args.get('class')
            section_filter = request.args.get('section')

            base_query = "SELECT * FROM Students"
            params = []
            conditions = []

            if class_filter:
                conditions.append("class = %s")
                params.append(class_filter)
            if section_filter:
                conditions.append("section = %s")
                params.append(section_filter)

            if conditions:
                base_query += " WHERE " + " AND ".join(conditions)

            cursor.execute(base_query, params)
            students = cursor.fetchall()
            return jsonify(students), 200

        elif request.method == 'POST':
            data = request.json
            required_fields = [
                'name', 'dob', 'class', 'section', 'gender',
                'father_name', 'mother_name', 'email', 'mobile', 'address'
            ]

            if not all(field in data for field in required_fields):
                return jsonify({"error": "All fields are required!"}), 400

            # Check for existing student by email or mobile number (unique constraints)
            cursor.execute("SELECT auto_id FROM Students WHERE email = %s OR mobile = %s", 
                           (data['email'], data['mobile']))
            if cursor.fetchone():
                return jsonify({"error": "Student with this email or mobile number already exists!"}), 409

            # Insert student data
            cursor.execute("""
                INSERT INTO Students (
                    name, dob, class, section, gender,
                    father_name, mother_name, email, mobile, address
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                data['name'], data['dob'], data['class'], data['section'],
                data['gender'], data['father_name'], data['mother_name'],
                data['email'], data['mobile'], data['address']
            ))
            connection.commit()

            # Fetch the last inserted auto_id to generate student_id
            cursor.execute("SELECT LAST_INSERT_ID() AS last_id")
            last_id = cursor.fetchone()['last_id']
            student_id = f"STU{last_id}"

            # Update student_id
            cursor.execute("""
                UPDATE Students SET student_id = %s WHERE auto_id = %s
            """, (student_id, last_id))
            connection.commit()

            return jsonify({"message": "Student created successfully!", "student_id": student_id}), 201

        elif request.method == 'PUT':
            data = request.json
            if 'id' not in data:
                return jsonify({"error": "Student ID is required for update"}), 400

            # Check for email or mobile number conflict (unique constraints)
            cursor.execute("""
                SELECT auto_id FROM Students 
                WHERE (email = %s OR mobile = %s) AND auto_id != %s
            """, (data['email'], data['mobile'], data['id']))
            
            if cursor.fetchone():
                return jsonify({"error": "Another student with this email or mobile number already exists!"}), 409

            cursor.execute("""
                UPDATE Students SET
                    name = %s,
                    dob = %s,
                    class = %s,
                    section = %s,
                    gender = %s,
                    father_name = %s,
                    mother_name = %s,
                    email = %s,
                    mobile = %s,
                    address = %s
                WHERE auto_id = %s
            """, (
                data['name'], data['dob'], data['class'], data['section'],
                data['gender'], data['father_name'], data['mother_name'],
                data['email'], data['mobile'], data['address'], data['id']
            ))
            connection.commit()
            return jsonify({"message": "Student updated successfully!"}), 200

        elif request.method == 'DELETE':
            student_id = request.args.get('id')
            if not student_id:
                return jsonify({"error": "Student ID is required"}), 400

            # Check for existing student by auto_id
            cursor.execute("SELECT auto_id FROM Students WHERE auto_id = %s", (student_id,))
            
            if not cursor.fetchone():
                return jsonify({"error": "Student not found!"}), 404

            cursor.execute("DELETE FROM Students WHERE auto_id = %s", (student_id,))
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
            class_filter = request.args.get('class')
            payment_date = request.args.get('payment_date')

            base_query = """
                SELECT f.fee_id, f.student_id, f.name, f.class, 
                       f.amount, f.payment_mode, f.payment_date, 
                       f.receipt_no, f.created_at
                FROM Fee f
            """
            params = []
            conditions = []
            
            if class_filter:
                conditions.append("f.class = %s")
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
            required_fields = ['student_id', 'name', 'class', 'amount', 'payment_mode', 'payment_date', 'receipt_no']
            
            if not all(field in data for field in required_fields):
                return jsonify({"error": "All fields are required!"}), 400
            
            cursor.execute("""
                INSERT INTO Fee (student_id, name, class, amount, payment_mode, payment_date, receipt_no)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                data['student_id'], data['name'], data['class'], data['amount'],
                data['payment_mode'], data['payment_date'], data['receipt_no']
            ))
            
            connection.commit()
            return jsonify({"message": "Fee record created successfully!"}), 201

        elif request.method == 'PUT':
            data = request.json
            if 'fee_id' not in data:
                return jsonify({"error": "Fee ID is required for update"}), 400

            query = """
                UPDATE Fee SET
                    amount = %s,
                    payment_mode = %s,
                    payment_date = %s,
                    receipt_no = %s
                WHERE fee_id = %s
            """
            cursor.execute(query, (
                data['amount'], data['payment_mode'],
                data['payment_date'], data['receipt_no'], data['fee_id']
            ))
            connection.commit()
            return jsonify({"message": "Fee record updated successfully!"}), 200

        elif request.method == 'DELETE':
            fee_id = request.args.get('fee_id')
            if not fee_id:
                return jsonify({"error": "Fee ID is required"}), 400

            query = "DELETE FROM Fee WHERE fee_id = %s"
            cursor.execute(query, (fee_id,))
            connection.commit()
            return jsonify({"message": "Fee record deleted successfully!"}), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


@user_routes.route('/admin/notices', methods=['GET', 'POST'])
def manage_notices():
    if request.method == 'GET':
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            # Fetching all notices from the "Notices" table
            cursor.execute("SELECT id, title, file_path, uploaded_at FROM Notices")
            notices = cursor.fetchall()
            return jsonify(notices), 200
        except Exception as e:
            return jsonify({"error": f"Failed to fetch notices: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

    elif request.method == 'POST':
        data = request.json
        required_fields = ['title', 'file_path']
        if not all(data.get(field) for field in required_fields):
            return jsonify({"error": "Both title and file path are required!"}), 400

        connection = get_connection()
        cursor = connection.cursor()
        try:
            # Inserting a new notice into the "Notices" table
            insert_query = """
                INSERT INTO Notices (title, file_path)
                VALUES (%s, %s)
            """
            cursor.execute(insert_query, (
                data['title'], data['file_path']
            ))
            connection.commit()
            
            # Retrieve the auto-generated notice id
            notice_id_query = "SELECT id FROM Notices WHERE id = LAST_INSERT_ID()"
            cursor.execute(notice_id_query)
            notice_id = cursor.fetchone()[0]
            
            return jsonify({"message": "Notice added successfully!", "notice_id": notice_id}), 201
        except Exception as e:
            return jsonify({"error": f"Failed to add notice: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()
@user_routes.route('/admin/timetable', methods=['GET', 'POST'])
def manage_timetable():
    if request.method == 'GET':
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)  # Ensure results are returned as dictionaries
        try:
            # Fetching all timetables from the "TimeTable" table
            cursor.execute("SELECT id, title, file_path, uploaded_at FROM TimeTable")
            timetables = cursor.fetchall()
            return jsonify(timetables), 200
        except Exception as e:
            return jsonify({"error": f"Failed to fetch timetables: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

    elif request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "File is required!"}), 400

        title = request.form.get('title')
        if not title:
            return jsonify({"error": "Title is required!"}), 400

        uploaded_file = request.files['file']

        # Ensure the directory exists
        timetable_folder = os.path.join(UPLOAD_FOLDER, 'timetables')
        if not os.path.exists(timetable_folder):
            os.makedirs(timetable_folder)

        # Save the file to the server
        file_path = os.path.join(timetable_folder, uploaded_file.filename)
        try:
            uploaded_file.save(file_path)  # Save file to the desired location
        except Exception as e:
            return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)  # Ensure results are returned as dictionaries
        try:
            # Inserting a new timetable into the "TimeTable" table
            insert_query = """
                INSERT INTO TimeTable (title, file_path)
                VALUES (%s, %s)
            """
            cursor.execute(insert_query, (title, file_path))
            connection.commit()

            # Retrieve the auto-generated timetable id
            cursor.execute("SELECT LAST_INSERT_ID() AS id")
            timetable_id = cursor.fetchone()['id']  # Access the dictionary key instead of tuple index

            return jsonify({"message": "Timetable uploaded successfully!", "timetable_id": timetable_id}), 201
        except Exception as e:
            return jsonify({"error": f"Failed to upload timetable: {str(e)}"}), 500
        finally:
            cursor.close()
            connection.close()

@user_routes.route('/admin/assignments', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_assignments():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # GET: Fetch assignments
        if request.method == 'GET':
            cursor.execute("SELECT * FROM assignments")
            assignments = cursor.fetchall()
            return jsonify(assignments), 200

        # POST: Add new assignment
        elif request.method == 'POST':
            if 'file' not in request.files:
                return jsonify({"error": "No file uploaded"}), 400

            file = request.files['file']
            title = request.form.get('title')
            date = request.form.get('date')
            description = request.form.get('description')
            assignment_class = request.form.get('class')

            if not (title and date and description and assignment_class):
                return jsonify({"error": "All fields are required"}), 400

            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(UPLOAD_FOLDER, filename)
                file.save(file_path)

                cursor.execute(
                    "INSERT INTO assignments (title, date, description, class, file_path) VALUES (%s, %s, %s, %s, %s)",
                    (title, date, description, assignment_class, file_path)
                )
                connection.commit()
                return jsonify({"message": "Assignment uploaded successfully", "file_path": file_path}), 201
            else:
                return jsonify({"error": "Invalid file type"}), 400

        # PUT: Update an assignment
        elif request.method == 'PUT':
            assignment_id = request.form.get('assignment_id')
            title = request.form.get('title')
            date = request.form.get('date')
            description = request.form.get('description')
            assignment_class = request.form.get('class')

            if not assignment_id:
                return jsonify({"error": "Assignment ID is required"}), 400

            cursor.execute("SELECT * FROM assignments WHERE id = %s", (assignment_id,))
            assignment = cursor.fetchone()
            if not assignment:
                return jsonify({"error": "Assignment not found"}), 404

            file = request.files.get('file')
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(UPLOAD_FOLDER, filename)
                file.save(file_path)

                # Delete the old file
                old_file_path = assignment['file_path']
                if os.path.exists(old_file_path):
                    os.remove(old_file_path)

                cursor.execute(
                    "UPDATE assignments SET title=%s, date=%s, description=%s, class=%s, file_path=%s WHERE id=%s",
                    (title, date, description, assignment_class, file_path, assignment_id)
                )
                connection.commit()
                return jsonify({"message": "Assignment updated successfully", "file_path": file_path}), 200
            else:
                cursor.execute(
                    "UPDATE assignments SET title=%s, date=%s, description=%s, class=%s WHERE id=%s",
                    (title, date, description, assignment_class, assignment_id)
                )
                connection.commit()
                return jsonify({"message": "Assignment updated successfully"}), 200

        # DELETE: Delete an assignment
        elif request.method == 'DELETE':
            assignment_id = request.args.get('assignment_id')
            if not assignment_id:
                return jsonify({"error": "Assignment ID is required"}), 400

            cursor.execute("SELECT file_path FROM assignments WHERE id = %s", (assignment_id,))
            assignment = cursor.fetchone()
            if not assignment:
                return jsonify({"error": "Assignment not found"}), 404

            # Delete the file
            file_path = assignment['file_path']
            if os.path.exists(file_path):
                os.remove(file_path)

            cursor.execute("DELETE FROM assignments WHERE id = %s", (assignment_id,))
            connection.commit()
            return jsonify({"message": "Assignment deleted successfully"}), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()
@user_routes.after_request
def add_security_headers(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@user_routes.route('/admin/signup', methods=['POST'])
def signup_user():
    try:
        data = request.json
        email = data.get('email')
        mobile = data.get('mobile_no')
        roll_no = data.get('roll_no')  # This is the user ID
        password = data.get('password')

        if not all([email, mobile, roll_no, password]):
            return jsonify({"error": "All fields are required!"}), 400

        connection = get_connection()
        cursor = connection.cursor()

        # Check if the roll_no exists in Students or Teachers table
        cursor.execute("SELECT student_id FROM Students WHERE student_id = %s", (roll_no,))
        student_result = cursor.fetchone()

        cursor.execute("SELECT teacher_id FROM Teachers WHERE teacher_id = %s", (roll_no,))
        teacher_result = cursor.fetchone()

        # Determine user type
        if roll_no == "ADMIN01":
            user_type = "1"  # Admin
        elif student_result:
            user_type = "3"  # Student
        elif teacher_result:
            user_type = "2"  # Teacher
        else:
            return jsonify({"error": "The provided ID does not exist in the Students or Teachers table."}), 404

        # Check if email is already registered
        cursor.execute("SELECT * FROM Login WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"error": "Email is already registered!"}), 409

        # Ensure the user_id exists in the appropriate table before inserting into Login
        if user_type == "3" and not student_result:
            return jsonify({"error": "Student ID does not exist in the Students table."}), 404
        if user_type == "2" and not teacher_result:
            return jsonify({"error": "Teacher ID does not exist in the Teachers table."}), 404

        # Hash the password before storing
        hashed_password = generate_password_hash(password)

        # Insert user into Login table
        insert_query = """
            INSERT INTO Login (user_id, email, mobile, password_hash, user_type) 
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (roll_no, email, mobile, hashed_password, user_type))
        connection.commit()

        return jsonify({"message": "User registered successfully!", "user_type": user_type, "redirect": "/Signin"}), 201
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()

@user_routes.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.json
        roll_no = data.get('roll_no')
        password = data.get('password')

        if not all([roll_no, password]):
            return jsonify({"error": "Both User ID and Password are required!"}), 400

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        try:
            cursor.execute("""
                SELECT user_id, password_hash, user_type 
                FROM Login 
                WHERE user_id = %s
            """, (roll_no,))
            user = cursor.fetchone()

            if not user or not check_password_hash(user['password_hash'], password):
                return jsonify({"error": "Invalid User ID or Password!"}), 401

            # Set session data with permanent=True
            session.permanent = True
            session['user_id'] = user['user_id']
            session['user_type'] = user['user_type']

            response = jsonify({
                "message": "Login successful!",
                "user_id": user['user_id'],
                "user_type": user['user_type'],
                "redirect": "/StudentDashboard" if user['user_type'] == '3' else "/TeacherDashboard"
            })

            # Set cookie attributes
            response.set_cookie(
                'session', 
                session['user_id'], 
                httponly=True, 
                samesite='Lax',
                secure=False,  # Set to True in production with HTTPS
                max_age=86400  # 24 hours
            )
            
            return response, 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "Login failed"}), 500

@user_routes.route('/admin/logout', methods=['POST'])
def logout_admin():
    try:
        # Clear the session to log out the user
        session.clear()

        return jsonify({"message": "Logout successful!"}), 200
    except Exception as e:
        # Print the error for debugging (optional)
        print(f"Error during logout: {e}")

        # Provide a more user-friendly error message
        return jsonify({
            "error": "An error occurred during logout.",
            "redirect": "/signin"  # Adjusted the redirect path to be a URL, not a JS file
        }), 500

@user_routes.route('/upload-timetable', methods=['POST'])
def upload_timetable():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({"message": "Timetable uploaded successfully", "file_path": f"/{file_path}"}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400

@user_routes.route('/get-timetable', methods=['GET'])
def get_timetable():
    try:
        timetable_files = [f for f in os.listdir(UPLOAD_FOLDER) if allowed_file(f)]
        if not timetable_files:
            return jsonify({"error": "No timetable found"}), 404

        # Assuming the latest uploaded timetable is required
        latest_timetable = max(timetable_files, key=lambda f: os.path.getctime(os.path.join(UPLOAD_FOLDER, f)))
        file_path = os.path.join(UPLOAD_FOLDER, latest_timetable)
        return jsonify({"file_path": f"/{file_path}"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve timetable: {str(e)}"}), 500

@user_routes.route('/details', methods=['GET'])
def get_user_details():
    try:
        # Check session
        if 'user_id' not in session:
            return jsonify({"error": "Not authenticated"}), 401

        user_id = session.get('user_id')
        user_type = session.get('user_type')

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        try:
            if user_type == '3':  # Student
                query = """
                    SELECT s.*, l.user_type, l.email as login_email
                    FROM Students s
                    JOIN Login l ON s.student_id = l.user_id
                    WHERE s.student_id = %s
                """
                cursor.execute(query, (user_id,))
                user_details = cursor.fetchone()

                if not user_details:
                    return jsonify({"error": "Student not found"}), 404

                return jsonify({"user_details": user_details}), 200
            else:
                return jsonify({"error": "Access denied"}), 403

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error fetching details: {str(e)}")
        return jsonify({"error": "Failed to fetch user details"}), 500

@user_routes.route('/admin/marks', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_marks():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # ----------------- GET -----------------
        if request.method == 'GET':
            cursor.execute("""
                SELECT 
                    m.id AS marks_id,
                    s.student_id,
                    s.name AS student_name,
                    s.dob,
                    s.class,
                    s.section,
                    s.gender,
                    s.mobile AS contact_no,
                    m.math,
                    m.english,
                    m.physics,
                    m.chemistry,
                    m.odia,
                    m.hindi,
                    m.total_marks,
                    m.marks_obtained,
                    CAST(m.percentage AS FLOAT) AS percentage
                FROM marks_entry m
                JOIN Students s ON m.student_id = s.student_id
            """)
            marks = cursor.fetchall()
            return jsonify(marks), 200


        # ----------------- POST -----------------
        elif request.method == 'POST':
            data = request.json

            student_id = data.get('student_id')
            exam_name = data.get('exam_name')
            class_name = data.get('class')
            math = int(data.get('math'))
            english = int(data.get('english'))
            physics = int(data.get('physics'))
            chemistry = int(data.get('chemistry'))
            odia = int(data.get('odia'))
            hindi = int(data.get('hindi'))

            total_marks = 600
            marks_obtained = math + english + physics + chemistry + odia + hindi
            percentage = (marks_obtained / total_marks) * 100

            cursor.execute("""
                INSERT INTO marks_entry (
                    student_id, exam_name, class, math, english, physics, chemistry, odia, hindi,
                    total_marks, marks_obtained, percentage
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                student_id, exam_name, class_name, math, english, physics, chemistry,
                odia, hindi, total_marks, marks_obtained, percentage
            ))

            connection.commit()
            return jsonify({"message": "Marks submitted successfully"}), 201

        # ----------------- PUT -----------------
        elif request.method == 'PUT':
            data = request.json

            entry_id = data.get('id')  # ID of the marks entry to update
            if not entry_id:
                return jsonify({"error": "Entry ID is required"}), 400

            math = int(data.get('math'))
            english = int(data.get('english'))
            physics = int(data.get('physics'))
            chemistry = int(data.get('chemistry'))
            odia = int(data.get('odia'))
            hindi = int(data.get('hindi'))
            exam_name = data.get('exam_name')
            class_name = data.get('class')

            total_marks = 600
            marks_obtained = math + english + physics + chemistry + odia + hindi
            percentage = (marks_obtained / total_marks) * 100

            cursor.execute("SELECT * FROM marks_entry WHERE id = %s", (entry_id,))
            existing = cursor.fetchone()
            if not existing:
                return jsonify({"error": "Marks entry not found"}), 404

            cursor.execute("""
                UPDATE marks_entry
                SET exam_name=%s, class=%s, math=%s, english=%s, physics=%s,
                    chemistry=%s, odia=%s, hindi=%s, marks_obtained=%s, percentage=%s
                WHERE id=%s
            """, (
                exam_name, class_name, math, english, physics, chemistry,
                odia, hindi, marks_obtained, percentage, entry_id
            ))

            connection.commit()
            return jsonify({"message": "Marks updated successfully"}), 200

        # ----------------- DELETE -----------------
        elif request.method == 'DELETE':
            entry_id = request.args.get('id')
            if not entry_id:
                return jsonify({"error": "Entry ID is required"}), 400

            cursor.execute("SELECT * FROM marks_entry WHERE id = %s", (entry_id,))
            existing = cursor.fetchone()
            if not existing:
                return jsonify({"error": "Marks entry not found"}), 404

            cursor.execute("DELETE FROM marks_entry WHERE id = %s", (entry_id,))
            connection.commit()
            return jsonify({"message": "Marks deleted successfully"}), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()

@user_routes.route('/attendance', methods=['GET', 'POST', 'DELETE', 'PUT'])
def manage_attendance():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # ----------------- GET -----------------
        if request.method == 'GET':
            cursor.execute("SELECT * FROM attendance ORDER BY attendance_date DESC")
            data = cursor.fetchall()
            return jsonify(data), 200

        # ----------------- POST -----------------
        elif request.method == 'POST':
            data = request.json

            student_id = data.get('student_id')
            student_name = data.get('student_name')
            class_name = data.get('class')
            attendance_date = data.get('attendance_date')
            status = data.get('status')  # should be 'Present' or 'Absent'

            if not all([student_id, student_name, class_name, attendance_date, status]):
                return jsonify({"error": "All fields are required"}), 400

            cursor.execute("""
                INSERT INTO attendance (student_id, student_name, class, attendance_date, status)
                VALUES (%s, %s, %s, %s, %s)
            """, (student_id, student_name, class_name, attendance_date, status))

            conn.commit()
            return jsonify({"message": "Attendance marked successfully"}), 201

        # ----------------- PUT -----------------
        elif request.method == 'PUT':
            data = request.json
            attendance_id = data.get('id')

            if not attendance_id:
                return jsonify({"error": "Attendance ID is required"}), 400

            student_id = data.get('student_id')
            student_name = data.get('student_name')
            class_name = data.get('class')
            attendance_date = data.get('attendance_date')
            status = data.get('status')

            cursor.execute("SELECT * FROM attendance WHERE id = %s", (attendance_id,))
            if not cursor.fetchone():
                return jsonify({"error": "Attendance record not found"}), 404

            cursor.execute("""
                UPDATE attendance 
                SET student_id=%s, student_name=%s, class=%s, attendance_date=%s, status=%s
                WHERE id=%s
            """, (student_id, student_name, class_name, attendance_date, status, attendance_id))

            conn.commit()
            return jsonify({"message": "Attendance updated successfully"}), 200

        # ----------------- DELETE -----------------
        elif request.method == 'DELETE':
            attendance_id = request.args.get('id')
            if not attendance_id:
                return jsonify({"error": "ID is required"}), 400

            cursor.execute("SELECT * FROM attendance WHERE id = %s", (attendance_id,))
            if not cursor.fetchone():
                return jsonify({"error": "Attendance record not found"}), 404

            cursor.execute("DELETE FROM attendance WHERE id = %s", (attendance_id,))
            conn.commit()
            return jsonify({"message": "Attendance deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()
@user_routes.route('/admin/marks', methods=['GET'])
def get_marks():
    try:
        student_id = request.args.get('student_id')
        if not student_id:
            return jsonify({"error": "Student ID is required"}), 400

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT 
                m.*,
                s.student_id,
                s.name AS student_name,
                s.class,
                CAST(m.percentage AS FLOAT) AS percentage
            FROM marks_entry m
            JOIN Students s ON m.student_id = s.student_id
            WHERE s.student_id = %s
        """
        cursor.execute(query, (student_id,))
        marks = cursor.fetchall()

        if not marks:
            return jsonify([]), 200

        return jsonify(marks), 200

    except Exception as e:
        print(f"Error fetching marks: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()
