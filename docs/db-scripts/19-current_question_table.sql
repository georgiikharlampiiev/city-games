DROP TABLE citygames.current_question;
CREATE TABLE citygames.current_question
(
    game_team_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    start_date DATETIME,
    PRIMARY KEY (`game_team_id`),
    UNIQUE KEY `game_team_id_uindex` (`game_team_id`)
);