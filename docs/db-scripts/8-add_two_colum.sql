ALTER TABLE citygames.game CHANGE disabled_games disabled BOOLEAN;
ALTER TABLE citygames.game ALTER COLUMN disabled SET DEFAULT 0;




/*update game g set g.disabled_games=1,  WHERE g.date_finish<=current_time and g.disabled_games = 1;*/


select  date_finish From game g  WHERE g.date_finish < current_date;
