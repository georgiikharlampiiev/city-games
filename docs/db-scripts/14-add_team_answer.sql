CREATE TABLE citygames.team_answer
(
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    correct INT(1) DEFAULT 0 NOT NULL,
    deleted INT(1) DEFAULT 0 NOT NULL,
    answer VARCHAR(255),
    question_id BIGINT NOT NULL,
    team_id BIGINT
);
CREATE UNIQUE INDEX team_answer_id_uindex ON citygames.team_answer (id);

ALTER TABLE citygames.team_answer ADD time DATETIME NOT NULL;