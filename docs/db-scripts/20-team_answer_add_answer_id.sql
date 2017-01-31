ALTER TABLE team_answer ADD answer_id BIGINT(20),
ADD CONSTRAINT answer_id
FOREIGN KEY (answer_id) REFERENCES answer (id);