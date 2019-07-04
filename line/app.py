import os
 
import pandas as pd
import numpy as np
import sqlite3 as sql
import seaborn as sns
import matplotlib.pyplot as plt

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
#
# Bimi's section
#
db.Model.metadata.reflect(db.engine)

cnx = sql.connect('db/WorldCup.sqlite')
df = pd.read_sql_query("SELECT * FROM ResultsByCountry2 order by wins desc, runners_up desc, country", cnx)
df.groupby(['country','wins','runners_up']).size().unstack().plot(kind='bar',stacked=True)

class Result(db.Model):
    __tablename__ = 'ResultsByCountry2'
    __table_args__ = { 'extend_existing': True }
    id = db.Column(db.Integer, primary_key=True)

@app.route("/save_chart")
def save_chart():
#Read in data & create total column
  stacked_bar_data = df

  #Set general plot properties
  sns.set_style("white")
  sns.set_context({"figure.figsize": (24, 10)})

  #Plot 1 - background - "total" (top) series
  sns.barplot(x = stacked_bar_data.country, y = stacked_bar_data.total_finals, color = "red")

  #Plot 2 - overlay - "bottom" series
  bottom_plot = sns.barplot(x = stacked_bar_data.country, y = stacked_bar_data.wins, color = "#0000A3")

  topbar = plt.Rectangle((0,0),1,1,fc="red", edgecolor = 'none')
  bottombar = plt.Rectangle((0,0),1,1,fc='#0000A3',  edgecolor = 'none')
  l = plt.legend([bottombar, topbar], ['Wins', 'Runners Up'], loc=1, ncol = 2, prop={'size':16})
  l.draw_frame(False)

  #Optional code - Make plot look nicer
  sns.despine(left=True)
  bottom_plot.set_ylabel("Wins / Runners Up")
  bottom_plot.set_xlabel("Countries")

  #Set fonts to consistent 16pt size
  for item in ([bottom_plot.xaxis.label, bottom_plot.yaxis.label] +
              bottom_plot.get_xticklabels() + bottom_plot.get_yticklabels()):
      item.set_fontsize(16)
  
  loc='static/Images/wins_runners_up.png'
  plt.savefig(loc, bbox_inches='tight')
  plt.close('all')
  return loc


@app.route("/wins")
def wins():
    wins = Result.query.all()
    loc = save_chart()
    return render_template("wins.html", winners=wins, chart=loc)

# @app.route("/wins/<year>")
# def wins(year):
#   wins = Result.query.all()
#   return render_template("wins.html", year=year, winners=wins, chart='/' + save_chart())

@app.route("/win/<year>")
def win(year):
  with sql.connect("data/WorldCup.sqlite3") as con:
    cur = con.cursor()
    cur.execute("select * from ResultsByCountry2 where Country in ( select Country from YearCountry where Year is ? )", (year,) )
    win = cur.fetchall()  
    #return render_template("result.html", year=year, winner=result, chart='/static/img/wins_runners_up.png')
    return render_template("win.html", year=year, winner=win, chart='/' + save_chart())

#
# End Bimi's section
#

if __name__ == "__main__":
    app.run()


