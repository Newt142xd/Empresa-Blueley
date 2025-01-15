from flask import Flask, request, jsonify, session
from flask_cors import CORS
import mysql.connector
import hashlib
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)  # Llave para sesiones seguras
CORS(app, supports_credentials=True)

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'BLUELEY'
}

@app.route('/registro', methods=['POST'])
def registro():
    try:
        data = request.json
        nombre = data['name']
        apellido = data['apellido']
        correo = data['email']
        contrasena = hashlib.sha256(data['password'].encode()).hexdigest()

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = """INSERT INTO Usuario (Nombre, Apellido, Correo, Contrasena)
                   VALUES (%s, %s, %s, %s)"""
        cursor.execute(query, (nombre, apellido, correo, contrasena))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'success': True, 'message': 'Usuario registrado exitosamente'})
    except mysql.connector.Error as err:
        if err.errno == 1062:
            return jsonify({'success': False, 'message': 'El correo ya está registrado'}), 400
        return jsonify({'success': False, 'message': 'Error en la base de datos'}), 500
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    if 'user_id' in session:
        return jsonify({'success': False, 'message': 'Ya hay una sesión activa'}), 400

    try:
        data = request.json
        username_or_email = data['username']
        password = hashlib.sha256(data['password'].encode()).hexdigest()

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT Id_usuario, Nombre, Correo
            FROM Usuario
            WHERE (Correo = %s OR Nombre = %s) AND Contrasena = %s
        """
        cursor.execute(query, (username_or_email, username_or_email, password))
        usuario = cursor.fetchone()
        cursor.close()
        conn.close()

        if usuario:
            session['user_id'] = usuario['Id_usuario']  # Guarda la sesión
            session['user_name'] = usuario['Nombre']
            return jsonify({
                'success': True,
                'message': 'Inicio de sesión exitoso',
                'usuario': {
                    'id': usuario['Id_usuario'],
                    'nombre': usuario['Nombre'],
                    'correo': usuario['Correo']
                }
            })
        else:
            return jsonify({'success': False, 'message': 'Usuario o contraseña incorrectos'}), 401
            
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/logout', methods=['POST'])
def logout():
    if 'user_id' in session:
        session.clear()  # Limpia la sesión
        return jsonify({'success': True, 'message': 'Sesión cerrada exitosamente'})
    return jsonify({'success': False, 'message': 'No hay sesión activa'}), 400

@app.route('/user-info', methods=['GET'])
def get_user_info():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Sesión no válida'}), 401

    user_id = session['user_id']
    user_name = session['user_name']
    return jsonify({'success': True, 'usuario': {'id': user_id, 'nombre': user_name}})

if __name__ == '__main__':
    app.run(debug=True)
