ALTER TABLE citygames.answer ADD score INT DEFAULT 0 NOT NULL;
ALTER TABLE citygames.answer ADD answer_tags TEXT NULL;
ALTER TABLE citygames.answer ADD is_close_question INT(1) DEFAULT 0 NULL;