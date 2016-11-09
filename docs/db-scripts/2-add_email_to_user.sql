ALTER TABLE citygames.game_user ADD email VARCHAR(255) NULL;
CREATE UNIQUE INDEX game_user_email_uindex ON citygames.game_user (email);