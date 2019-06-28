WorldCup.Sqlite 

Data is already summarized so we don’t have to do anything else to it.
Location: \FifaApp\db
Tables:
1.	YearCountry: this table should be used for the drop down menu, to display years, and link years to winner countries
2.	FinalGamesByYear
3.	TopTeamsByYear
4.	ResultsByCountry: list each country and data about their results overtime.
5.	TopPlayersByCountry

Data: The csv files with the data in each table is under the resources folder. 

To do:
•	Flask needs to have one route per dataset returning the data by year or country
•	To create the charts/Tables, select one of the datasets. There is no need to join or anything, just choose the route that returns the data that you want.
