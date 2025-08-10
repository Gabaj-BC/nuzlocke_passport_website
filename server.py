# Lib Imports
import sys
import pandas as pd
import datetime as dt
from flask import Flask, render_template, request

# Local Imports


sys.path.append("../../")
sys.path.append("../../../")
sys.path.append("../../../../")

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/index.html')
def index():
    args = request.args
    return render_template('index.html')


@app.route('/coming_soon.html', methods=["GET"])
def coming_soon():
    return render_template("coming_soon.html")


if __name__ == "__main__":
    ip_address = "localhost"
    port = 7653
    app.run(host=ip_address, port=port, debug=False)