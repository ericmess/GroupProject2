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

# Tables to make:
# FinalGamesByYear,ResultsByCountry,TopPlayersByCountry,TopTeamsByYear,YearCountry
# Save references to each table

conn = db.engine.connect()
YearCountry = pd.read_sql("SELECT * from YearCountry", conn) #import pandas
YearCountry=YearCountry["Year"]
YearCountry

conn = db.engine.connect()
TopTeamsByYear = pd.read_sql("SELECT * from TopTeamsByYear", conn) #import pandas

conn = db.engine.connect()
TopPlayersByCountry = pd.read_sql("SELECT * from TopPlayersByCountry", conn) #import pandas

conn = db.engine.connect()
results = pd.read_sql("SELECT * from ResultsByCountry", conn) #import pandas


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/years")
def names():
    stmnt0 = 'Select distinct Year, Country from YearCountry'
    df = pd.read_sql(stmnt0, db.session.bind)
    data = []
    i = 0
    while i < len(df):
        year_country = {
            'Year':list(df['Year'])[i],
            'Country':list(df['Country'])[i]
        }
        data.append(year_country)
        i+=1
    return jsonify(data)


@app.route("/FinalGamesByYear/<year>")
def coords(year):
    stmnt1 = 'Select distinct Year, Country, WinnerLatitude, WinnerLongitude, FinalScore, Runnerup, RunnerupLatitude,RunnerupLongitude,Venue,Host,HostLatitude,HostLongitude,Attendance from FinalGamesByYear where year =' + year
    df = pd.read_sql(stmnt1, db.session.bind)
    data = []
    i=0
    while i < len(df):
        countries = {
               'Year':list(df['Year'])[i],
               'Country':list(df['Country'])[i],
               'WinnerLatitude':list(df['WinnerLatitude'])[i],
               'WinnerLongitude':list(df['WinnerLongitude'])[i],
               'FinalScore':list(df['FinalScore'])[i],
               'Runnerup':list(df['Runnerup'])[i],
               'RunnerupLatitude':list(df['RunnerupLatitude'])[i],
               'RunnerupLongitude':list(df['RunnerupLongitude'])[i],
               'Venue':list(df['Venue'])[i],
               'Host':list(df['Host'])[i],
               'HostLatitude':list(df['HostLatitude'])[i],
               'HostLongitude':list(df['HostLongitude'])[i],
               'Attendance':list(df['Attendance'])[i]}
        data.append(countries)
        i+=1
    return jsonify(data)

'''
@app.route("/TopTeamsByYear/<country>")
def TopTeamsByYear():
    """Final games by year"""
    stmnt2 = 'Select distinct Years, country, Latitude, Longitude, Rank from TopTeamsByYear where country =' + country
    df = pd.read_sql(stmnt2, db.session.bind)
    i = 0
    while i < len(df):
    #query code here
'''
'''
@app.route("/TopPlayersByCountry")
def TopPlayersByCountry():
    """Final games by year"""
    
    #query code here
'''

@app.route("/ResultsByCountry/<country>")
def Results(country):

   df=results.loc[(results["Country"] == country) ]
   i = 0

   while i < len(df):
       results_dict = {

           'Country':list(df['Country'])[i],
           'Latitude':list(df['Latitude'])[i],
           'Longitude':list(df['Longitude'])[i],
           'Wins':list(df['Wins'])[i],
           'Runnersup':list(df['Runners-up'])[i],
           'Totalfinals':list(df['Total finals'])[i],
           'Yearswon':list(df['Years won'])[i],
           'Yearsrunners-up':list(df['Years runners-up'])[i]
           }

       i+=1
   return jsonify(results_dict)



if __name__ == "__main__":
    app.run()
