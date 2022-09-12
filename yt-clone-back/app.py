import os
import psycopg2
from flask import Flask
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
            host="containers-us-west-41.railway.app",
            database="railway",
            port="7476",
            user='postgres',
            password='HYp9FehkSKwpweSiym3M')
    return conn

@app.route('/')
def hello_world():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM videos;')
    videos = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(videos)