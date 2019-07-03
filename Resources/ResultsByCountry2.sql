create table ResultsByCountry2 as
select "index" as id
     , Country as country
	 , Latitude as latitude
	 , Longitude as longitude
	 , Wins as wins
	 , "Runners-up" as runners_up
	 , "Total finals" as total_finals
	 , "Years won" as years_won
	 , "Years runners-up" as years_runners_up
from ResultsByCountry;