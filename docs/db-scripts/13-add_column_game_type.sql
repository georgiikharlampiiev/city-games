ALTER TABLE game ADD game_type INTEGER(20) unsigned,
ADD CONSTRAINT game_type
FOREIGN KEY (game_type) REFERENCES type_game (id);



