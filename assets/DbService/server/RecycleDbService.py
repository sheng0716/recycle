from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS extension
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the SQLite database path
DATABASE = 'recycle_app.db'

def center_dict(row):
    return {
        'centerId': row[0],
        'name': row[1],
        'address': row[2],
        'state': row[3],
        'contactNo': row[4],
        'description': row[5],
        'latitude': row[6],
        'longitude': row[7],
        'websiteUrl': row[8],
        'locationUrl': row[9],
        'logoPath': row[10]
    }

# Function to get all company details from the company
@app.route('/api/companies', methods=['GET'])
def api_get_all_companies():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

# fetch data from table 
        cursor.execute('SELECT * FROM companies')
        companies_data = cursor.fetchall()

        # Get column names
        cursor.execute("PRAGMA table_info(companies)")
        columns_info = cursor.fetchall()
        column_names = [column[1] for column in columns_info]

    #    Create dictionaries with keys matching column names
        companies_with_headers = []
        for row in companies_data:
            company_dict = {}
            for i, column_name in enumerate(column_names):
                company_dict[column_name] = row[i]
            companies_with_headers.append(company_dict)
        return jsonify({'companies': companies_with_headers})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
        

# Function to get all retailer details from the company list
@app.route('/api/companies/retailer', methods=['GET'])
def api_get_all_companies_with_retailer():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = "SELECT * FROM companies WHERE type = 'retailer';"
        cursor.execute(sql_command)
        retailer_companies = cursor.fetchall()
        return jsonify({'retailer': retailer_companies})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# Function to get all recycle details from the company list
@app.route('/api/companies/recycle', methods=['GET'])
def api_get_all_companies_with_recycle():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = "SELECT * FROM companies WHERE type = 'recycle';"
        cursor.execute(sql_command)
        recycle_companies = cursor.fetchall()
        return jsonify({'recycle': recycle_companies})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

def get_row_material_as_dict(row):
    row_dict={
        'materialId':row[0],
        'name':row[1],
        'desc':row[2],
        'imagePath':row[3],
    }
    return row_dict

# Function to get recycle material data
@app.route('/api/materials', methods=['GET'])
def api_get_all_materials():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = "SELECT * FROM materials;"
        cursor.execute(sql_command)
        rows = cursor.fetchall()

        materials = []
        for row in rows:
            material_dict = {
                'id': row[0],
                'name': row[1],
                'description': row[2],
                'image': row[3]
            }
            materials.append(material_dict)

        return jsonify({'materials': materials})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


# Function to get company details by companyId from companies
@app.route('/api/companies/<int:companyId>', methods=['GET'])
def api_get_company_detail_by_companyId(companyId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM companies WHERE companyId = ?;'
        cursor.execute(sql_command, (companyId,))
        company=cursor.fetchall()
        return jsonify(company)

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


# Function to get company id from pivot table by materialId
@app.route('/api/materials/<int:materialId>', methods=['GET'])
def api_get_company_detail_by_materialId(materialId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM centerMaterials WHERE materialId = ?;'
        cursor.execute(sql_command, (materialId,))
        rows=cursor.fetchall()

        centerMaterial=[]
        for row in rows:
            center_Material_dict={
                'centerId':row[0],
                'materialId':row[1]
            }
            centerMaterial.append(center_Material_dict)

        return jsonify({'centerMaterials':centerMaterial})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

#get all centers information
@app.route('/api/centers', methods=['GET'])
def api_get_all_centers_information():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = 'SELECT * FROM center;'
        cursor.execute(sql_command)
        rows = cursor.fetchall()

        centers = [center_dict(row) for row in rows]

        return jsonify({'centers': centers})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()



#get one center information by centerId
@app.route('/api/centers/<int:centerId>', methods=['GET'])
def api_get_center_info_by_centerId(centerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = 'SELECT * FROM center WHERE centerId=?;'
        cursor.execute(sql_command,(centerId,))
        row = cursor.fetchone()

        if row:
            center = center_dict(row)
            return jsonify(center)  # Return a single center object directly
        else:
            return jsonify({"error": "Center not found"}), 404

        # rows = cursor.fetchall()

        # centers = [center_dict(row) for row in rows]

        # return jsonify({'centers': centers})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


#get all centers information based on material
@app.route('/api/centers/material/<int:materialId>', methods=['GET'])
def api_get_all_centers_information_by_materialId(materialId):
    page = request.args.get('page', 1, type=int)  # Default to page 1
    limit = request.args.get('limit', 10, type=int)  # Default to 10 items per page
    offset = (page - 1) * limit
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # sql_command='SELECT * FROM centerMaterials WHERE materialId = ?;'
        sql_command='SELECT * FROM center JOIN centerMaterials ON center.centerId=centerMaterials.centerId WHERE centerMaterials.materialId=? LIMIT? OFFSET ?;'
        cursor.execute(sql_command, (materialId,limit,offset))
        rows=cursor.fetchall()

        centers = [center_dict(row) for row in rows]
        
        count_command='SELECT COUNT(*) FROM center JOIN centerMaterials ON center.centerId=centerMaterials.centerId WHERE centerMaterials.materialId=?;'
        cursor.execute(count_command, (materialId,))
        total_count = cursor.fetchone()[0]

        # Calculate total pages
        total_pages = (total_count + limit - 1) // limit  # Ceiling division

        cursor.execute('SELECT name FROM materials WHERE materialId =?',(materialId,))
        materialName=cursor.fetchone()[0]

        response={
            'materialName':materialName,
            'centers':centers,
            'totalPages':total_pages,
            'curentPage':page,
        }

        return jsonify(response)

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
        
# #get all centers information
# @app.route('/api/centers', methods=['GET'])
# def api_get_all_centers_information():
#     try:
#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         sql_command='SELECT * FROM center;'
#         cursor.execute(sql_command)
#         rows=cursor.fetchall()

#         centers=[]
#         for row in rows:
#             center_dict={
#                 'centerId':row[0],
#                 'name':row[1],
#                 'address':row[2],
#                 'state':row[3],
#                 'contactNo':row[4],
#                 'description':row[5],
#                 'latitude':row[6],
#                 'logitude':row[7],
#                 'websiteUrl':row[8],
#                 'locationUrl':row[9],
#                 'logoPath':row[10],
#             }
#             centers.append(center_dict)

#         return jsonify({'centers':centers})

#     except Exception as e:
#         print('Error:', str(e))
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()
        

# Function to get book_id by user_id from bookshelves

# @app.route('/api/bookshelves/<int:user_id>', methods=['GET'])
# def api_get_bookshelf_by_user_id(user_id):
#     try:
#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         cursor.execute('SELECT book_id FROM bookshelves WHERE user_id = ?', (user_id,))
#         book_ids = [row[0] for row in cursor.fetchall()]
#         return jsonify({'bookIds': book_ids})

#     except Exception as e:
#         print('Error:', str(e))
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()


# @app.route('/api/bookshelves', methods=['POST'])
# def api_insert_into_bookshelves():
#     try:
#         data = request.get_json()
#         user_id = data.get('userId')
#         book_id = data.get('bookId')

#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         # Check if the record already exists
#         cursor.execute('SELECT * FROM bookshelves WHERE user_id = ? AND book_id = ?', (user_id, book_id))
#         existing_record = cursor.fetchone()

#         if existing_record:
#             return jsonify({'message': 'Record already exists'})

#         # Insert the record
#         cursor.execute('INSERT INTO bookshelves (user_id, book_id) VALUES (?, ?)', (user_id, book_id))
#         conn.commit()
#         return jsonify({'message': 'Record inserted successfully'})

#     except Exception as e:
#         print('Error:', str(e))
#         conn.rollback()
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()


# @app.route('/api/bookshelves/<int:user_id>/<int:book_id>', methods=['DELETE'])
# def api_remove_from_bookshelves(user_id, book_id):
#     try:
#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         # Delete the record
#         cursor.execute('DELETE FROM bookshelves WHERE user_id = ? AND book_id = ?', (user_id, book_id))
#         conn.commit()

#         if cursor.rowcount > 0:
#             return jsonify({'message': 'Record removed successfully'})
#         else:
#             return jsonify({'message': 'Record not found'})
#     except Exception as e:
#         print('Error:', str(e))
#         conn.rollback()
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()


# Function to get user data user_id

# @app.route('/api/users/<int:user_id>', methods=['GET'])
# def api_get_user_data_by_user_id(user_id):
#     try:
#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         # Fetch user data including book data using a JOIN query
#         cursor.execute('''
#             SELECT *
#             FROM users
#             WHERE users.user_id = ?
#         ''', (user_id,))

#         user_data = cursor.fetchall()
#         return jsonify({'userData': user_data})
#     except Exception as e:
#         print('Error:', str(e))
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()


# @app.route('/api/users/<int:user_id>', methods=['PUT'])
# def api_update_user_data(user_id):
#     try:
#         data = request.get_json()
#         new_username = data.get('username')
#         new_email = data.get('email')
#         new_phoneNumber = data.get('phoneNumber')
#         new_isMember = data.get('isMember')

#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         # Update the user data in the database
#         cursor.execute('''
#             UPDATE users
#             SET user_name = ?, email = ?, phone_no = ?, isMember = ?
#             WHERE user_id = ?
#         ''', (new_username, new_email, new_phoneNumber, new_isMember, user_id))

#         conn.commit()

#         if cursor.rowcount > 0:
#             return jsonify({'message': 'User data updated successfully'})
#         else:
#             return jsonify({'message': 'User not found'})

#     except Exception as e:
#         print('Error:', str(e))
#         conn.rollback()
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()


# @app.route('/api/login', methods=['POST'])
# def api_login():
#     try:
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         # Retrieve the user's data by email
#         cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
#         user_data = cursor.fetchone()  # (1, 'john', 'john', 'john@example.com123', '555-1234', 1)

#         if user_data:
#             # Check if the password matches
#             if user_data[2] == password:
#                 # Successful login
#                 return jsonify({'message': 'Login successful', 'userId': user_data[0]})
#             else:
#                 return jsonify({'message': 'Invalid password'})
#         else:
#             return jsonify({'message': 'User not found'})

#     except Exception as e:
#         print('Error:', str(e))
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()

# # add new user
# @app.route('/api/register', methods=['POST'])
# def api_register_user():
#     try:
#         data = request.get_json()
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')
#         phone_no = data.get('phoneNumber')
#         isMember = data.get('isMember')

#         conn = sqlite3.connect(DATABASE)
#         cursor = conn.cursor()

#         # Check if the email is already in use
#         cursor.execute('SELECT COUNT(*) FROM users WHERE email = ?', (email,))
#         count = cursor.fetchone()[0]

#         if count > 0:
#             # The email is already registered
#             return jsonify({'isUnique': False, 'message': 'Email is already registered'}), 400

#         # Insert the new user record into the database
#         cursor.execute('INSERT INTO users (user_name, email, password, phone_no, isMember) VALUES (?, ?, ?, ?, ?)',
#                        (username, email, password, phone_no, isMember))

#         # Retrieve the user_id
#         cursor.execute('SELECT user_id FROM users WHERE email = ?', (email,))
#         user_id = cursor.fetchone()

#         conn.commit()

#         return jsonify({'isUnique': True, 'message': 'Register successful', 'userId': user_id})

#     except Exception as e:
#         print('Error:', str(e))
#         conn.rollback()
#         return jsonify({'error': str(e)}), 500
#     finally:
#         conn.close()


if __name__ == '__main__':
    app.run(debug=True)
