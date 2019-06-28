import os
 
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static')



#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/WorldCup.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table

conn = db.engine.connect()
YearCountry = pd.read_sql("SELECT * from YearCountry", conn) #import pandas
YearCountry=YearCountry["Year"]
YearCountry




@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/years")
def names():
    """Return a list years."""

  
    # Return a list of the column names ()
    return jsonify(list(YearCountry))







if __name__ == "__main__":
    app.run()
