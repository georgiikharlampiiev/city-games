CREATE TABLE citygames.question
(
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `order` INT NOT NULL,
    name VARCHAR(255),
    description LONGTEXT NOT NULL,
    game_id LONG NOT NULL
);
CREATE UNIQUE INDEX question_id_uindex ON citygames.question (id);