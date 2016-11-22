ALTER TABLE citygames.game CHANGE flag disabled_games BOOLEAN;
ALTER TABLE citygames.game ALTER COLUMN disabled_games SET DEFAULT 0;




/*update game g set g.disabled_games=1,  WHERE g.date_finish<=current_time and g.disabled_games = 1;*/

select disabled_games From game g WHERE g.date_finish<=current_date and g.disabled_games = 1;