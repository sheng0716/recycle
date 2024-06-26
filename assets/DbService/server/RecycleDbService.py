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

def get_row_material_as_dict(row):
    row_dict={
        'materialId':row[0],
        'name':row[1],
        'desc':row[2],
        'imagePath':row[3],
    }
    return row_dict


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
                'image': row[3],
                'imageUrl': row[4]
            }
            materials.append(material_dict)

        return jsonify({'materials': materials})

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

#get all centers information
@app.route('/api/retailers', methods=['GET'])
def api_get_all_retailer_data():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = 'SELECT * FROM retailers;'
        cursor.execute(sql_command)
        rows = cursor.fetchall()

        retailers = [retailer_dict(row) for row in rows]

        return jsonify({'retailers': retailers})

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

# get All accept material by centerId
@app.route('/api/acceptedMaterials/centerId=<int:centerId>', methods=['GET'])
def api_get_all_accepted_materials_by_centerId(centerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = "SELECT materials.materialId, materials.name,materials.imageUrl FROM centerMaterials JOIN materials ON centerMaterials.materialId = materials.materialId WHERE centerMaterials.centerId=?;"
        cursor.execute(sql_command,(centerId,))
        rows = cursor.fetchall()

        accepted_materials = []
        for row in rows:
            accepted_material_dict = {
                'materialId': row[0],
                'name': row[1],
                'imageUrl':row[2],
            }
            accepted_materials.append(accepted_material_dict)

        return jsonify({'materials': accepted_materials})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
        

###Below is about retailer#####################################################################
def product_dict(row):
    return {
        'productId': row[0],
        'name': row[1],
        'price': row[2],
        'quantity': row[3],
        'imagePath': row[4],
        'category': row[5],
        'retailerId': row[6],
    }

def retailer_dict(row):
    return {
        'retailerId': row[0],
        'name': row[1],
        'address': row[2],
        'state': row[3],
        'contactNo': row[4],
        'description': row[5],
        'latitude': row[6],
        'longitude': row[7],
        'websiteUrl': row[8],
        'locationUrl': row[9],
        'logoPath': row[10],
    }
#Get All product data
@app.route('/api/products', methods=['GET'])
def api_get_all_products_information():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command = 'SELECT * FROM products;'
        cursor.execute(sql_command)
        rows = cursor.fetchall()

        products = [product_dict(row) for row in rows]

        return jsonify({'products': products})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


#Get retailer Info by productId
@app.route('/api/retailer/retailerId=<int:retailerId>', methods=['GET'])
def api_get_retailer_information_by_retailerId(retailerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM retailers WHERE retailerId=?;'
        cursor.execute(sql_command,(retailerId,))
        row=cursor.fetchone()

        if row:
            retailer=retailer_dict(row)
            return jsonify(retailer)
        else:
            return jsonify({'error':"retailer not found"}),404

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


#Get retailer selling products with retailerId in product table
@app.route('/api/retailer/retailerId=<int:retailerId>/products', methods=['GET'])
def api_get_retailer_selling_products_by_retailerId(retailerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM products WHERE retailerId=?;'
        cursor.execute(sql_command,(retailerId,))
        rows=cursor.fetchall()

        products=[product_dict(row)for row in rows]
        return jsonify({'products':products})


    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
######Review and Rating##############################################################
def review_retailer_dict(row):
    return {
        'reviewId': row[0],
        'retailerId': row[1],
        'rating': row[2],
        'comment': row[3],
    }
def review_center_dict(row):
    return {
        'reviewId': row[0],
        'centerId': row[1],
        'rating': row[2],
        'comment': row[3],
    }
@app.route('/api/review/retailerId=<int:retailerId>', methods=['GET'])
def api_get_retailer_review_by_retailerId(retailerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM review_retailer WHERE retailerId=?;'
        cursor.execute(sql_command,(retailerId,))
        rows=cursor.fetchall()

        reviews=[review_retailer_dict(row)for row in rows]
        return jsonify({'reviews':reviews})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
@app.route('/api/review/centerId=<int:centerId>', methods=['GET'])
def api_get_center_review_by_centerId(centerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM review_center WHERE centerId=?;'
        cursor.execute(sql_command,(centerId,))
        rows=cursor.fetchall()

        reviews=[review_center_dict(row)for row in rows]
        return jsonify({'reviews':reviews})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

######Favourite Stuff######################################################

def favourite_retailer(row):
    return {
        'userId': row[0],
        'retailerId': row[1],
        'retailerName':row[3],
        'address':row[4],
        'state':row[5],
        'logoPath':row[12],
    }
def favourite_center(row):
    return {
        'userId': row[0],
        'centerId': row[1],
        'centerName':row[3],
        'address':row[4],
        'state':row[5],
        'logoPath':row[12],
    }
        
#Get Favourite Retailer Data by userId
@app.route('/api/favourite/retailer/userId=<int:userId>', methods=['GET'])
def api_get_favourite_retailers_by_userId(userId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM favourite_retailers JOIN retailers ON favourite_retailers.retailerId=retailers.retailerId WHERE favourite_retailers.userId=?;'
        cursor.execute(sql_command,(userId,))
        rows=cursor.fetchall()

        favourite_retailers=[favourite_retailer(row)for row in rows]

        return jsonify({'favourite_retailer': favourite_retailers})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

#Get Favourite Center Data by userId
@app.route('/api/favourite/center/userId=<int:userId>', methods=['GET'])
def api_get_favourite_center_by_userId(userId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='SELECT * FROM favourite_centers JOIN center ON favourite_centers.centerId=center.centerId WHERE favourite_centers.userId=?;'
        cursor.execute(sql_command,(userId,))
        rows=cursor.fetchall()

        favourite_centers=[favourite_center(row)for row in rows]

        return jsonify({'favourite_center': favourite_centers})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# Insert favourite retailer into favourite retailer table
@app.route('/api/favourite/retailer/add', methods=['POST'])
def api_insert_favourite_retailer():
    try:
        data=request.get_json()
        userId=data.get('userId')
        retailerId=data.get('retailerId')

        conn=sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        #Check if the record already exists
        cursor.execute('SELECT * FROM favourite_retailers WHERE userId=? AND retailerId=?',(userId,retailerId))
        existing_record=cursor.fetchone()

        if existing_record:
            return jsonify({'message': 'Record already exists'})
        #Insert record
        cursor.execute('INSERT INTO favourite_retailers (userId,retailerId) VALUES (?,?)',(userId,retailerId))
        conn.commit()
        return jsonify({'message': 'Record inserted successfully'})

    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# Insert favourite center into favourite center table
@app.route('/api/favourite/center/add', methods=['POST'])
def api_insert_favourite_center():
    try:
        data=request.get_json()
        userId=data.get('userId')
        centerId=data.get('centerId')

        conn=sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        #Check if the record already exists
        cursor.execute('SELECT * FROM favourite_centers WHERE userId=? AND centerId=?',(userId,centerId))
        existing_record=cursor.fetchone()

        if existing_record:
            return jsonify({'message': 'Record already exists'})
        #Insert record
        cursor.execute('INSERT INTO favourite_centers (userId,centerId) VALUES (?,?)',(userId,centerId))
        conn.commit()
        return jsonify({'message': 'Record inserted successfully'})

    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


# Remove favourite product from favourite product table
@app.route('/api/favourite/retailer/remove/userId=<int:userId>/retailerId=<int:retailerId>', methods=['DELETE'])
def api_remove_from_favourite_retailer(userId,retailerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Delete the record
        cursor.execute('DELETE FROM favourite_retailers WHERE userId = ? AND retailerId = ?', (userId, retailerId))
        conn.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': 'Record removed successfully'})
        else:
            return jsonify({'message': 'Record not found'})
    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
# Remove favourite center from favourite center table
@app.route('/api/favourite/center/remove/userId=<int:userId>/centerId=<int:centerId>', methods=['DELETE'])
def api_remove_from_favourite_center(userId,centerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Delete the record
        cursor.execute('DELETE FROM favourite_centers WHERE userId = ? AND centerId = ?', (userId, centerId))
        conn.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': 'Record removed successfully'})
        else:
            return jsonify({'message': 'Record not found'})
    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


####User Data##################################################
        
#Function get user data by userId
@app.route('/api/users/userId=<int:userId>',methods=['GET'])
def api_get_user_data_by_userId(userId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Fetch user data including book data using a JOIN query
        cursor.execute('SELECT * FROM users WHERE userId = ?', (userId,))
        user_data = cursor.fetchall()
        return jsonify({'userData': user_data})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
#Function update user data
@app.route('/api/users/userId=<int:user_id>', methods=['PUT'])
def api_update_user_data(user_id):
    try:
        data = request.get_json()
        new_username = data.get('username')
        new_email = data.get('email')
        new_phoneNumber = data.get('phoneNumber')

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Update the user data in the database
        cursor.execute('''
            UPDATE users
            SET userName = ?, email = ?,phone_no=?
            WHERE userId = ?
        ''', (new_username, new_email, new_phoneNumber,user_id))

        conn.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': 'User data updated successfully'})
        else:
            return jsonify({'message': 'User not found'})

    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


####Login and Register########################################################
@app.route('/api/login', methods=['POST'])
def api_login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Retrieve the user's data by email
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        user_data = cursor.fetchone()  # (1, 'john', 'john', 'john@example.com123',)

        if user_data:
            # Check if the password matches
            if user_data[2] == password:
                # Successful login
                return jsonify({'message': 'Login successful', 'userId': user_data[0]})
            else:
                return jsonify({'message': 'Invalid password'})
        else:
            return jsonify({'message': 'User not found'})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# add new user
@app.route('/api/register', methods=['POST'])
def api_register_user():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        phone_no=data.get('phoneNumber')

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Check if the email is already in use
        cursor.execute('SELECT COUNT(*) FROM users WHERE email = ?', (email,))
        count = cursor.fetchone()[0]

        if count > 0:
            # The email is already registered
            return jsonify({'isUnique': False, 'message': 'Email is already registered'}), 400

        # Insert the new user record into the database
        cursor.execute('INSERT INTO users (userName, email, password,phone_no ) VALUES (?, ?, ?,? )',
                       (username, email, password,phone_no))

        # Retrieve the user_id
        cursor.execute('SELECT userId FROM users WHERE email = ?', (email,))
        user_id = cursor.fetchone()

        conn.commit()

        return jsonify({'isUnique': True, 'message': 'Register successful', 'userId': user_id})

    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
    

####Review ######################
#Function add new review into review_center
@app.route('/api/add/review_center', methods=['POST'])
def api_add_review_center():
    try:
        data = request.get_json()
        centerId = data.get('centerId')
        rating = data.get('rating')
        comment = data.get('comment')

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Insert the new user record into the database
        cursor.execute('INSERT INTO review_center (centerId, rating,comment ) VALUES (?, ?, ?)',
                       (centerId, rating, comment))


        conn.commit()

        return jsonify({'message':'Add review successful'})

    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
@app.route('/api/add/review_retailer', methods=['POST'])
def api_add_review_retailer():
    try:
        data = request.get_json()
        retailerId = data.get('retailerId')
        rating = data.get('rating')
        comment = data.get('comment')

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Insert the new user record into the database
        cursor.execute('INSERT INTO review_retailer (retailerId, rating,comment ) VALUES (?, ?, ?)',
                       (retailerId, rating, comment))


        conn.commit()

        return jsonify({'message':'Add review successful'})

    except Exception as e:
        print('Error:', str(e))
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
@app.route('/api/average_rating/centerId=<int:centerId>', methods=['GET'])
def api_getAverageRating_from_review_center_by_centerId(centerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='''
        SELECT AVG(CAST(rating AS FLOAT)) AS averageRating
        FROM review_center
        WHERE centerId=?
        '''
        cursor.execute(sql_command,(centerId,))
        average_rating = cursor.fetchone()[0]


        if average_rating is not None:
            # Successfully found the average rating, return it
            return jsonify({'centerId': centerId, 'averageRating': average_rating})
        else:
            # No ratings found for this centerId
            return jsonify({'centerId': centerId, 'averageRating': 'No ratings found'})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
@app.route('/api/average_rating/retailerId=<int:retailerId>', methods=['GET'])
def api_getAverageRating_from_review_retailer_by_retailerId(retailerId):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        sql_command='''
        SELECT AVG(CAST(rating AS FLOAT)) AS averageRating
        FROM review_retailer
        WHERE retailerId=?
        '''
        cursor.execute(sql_command,(retailerId,))
        average_rating = cursor.fetchone()[0]


        if average_rating is not None:
            # Successfully found the average rating, return it
            return jsonify({'retailerId': retailerId, 'averageRating': average_rating})
        else:
            # No ratings found for this centerId
            return jsonify({'retailerId': retailerId, 'averageRating': 'No ratings found'})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
