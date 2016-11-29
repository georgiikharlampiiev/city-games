CREATE TABLE citygames.answer
(
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    question_id BIGINT NOT NULL,
    next_question INT DEFAULT 0 NOT NULL
);
CREATE UNIQUE INDEX answer_id_uindex ON citygames.answer (id);