<h1>WorldCup.Sqlite</h1>
<br>

<h2>Data is already summarized so we don’t have to do anything else to it.</h2>
<br>
<br>
Location: \FifaApp\db <br>

Tables:<br>
1.	YearCountry: this table should be used for the drop down menu, to display years, and link years to winner countries <br>
2.	FinalGamesByYear <br>
3.	TopTeamsByYear <br>
4.	ResultsByCountry: list each country and data about their results overtime.<br>
5.	TopPlayersByCountry <br>

<br>

Data: The csv files with the data in each table is under the resources folder. <br>
<br>
To do: <br>
•	Flask needs to have one route per dataset returning the data by year or country <br>
•	To create the charts/Tables, select one of the datasets. There is no need to join or anything, just choose the route that returns the data that you want.
