ALTER TABLE citygames.question ADD score INT DEFAULT 0 NOT NULL;
ALTER TABLE citygames.question ADD auto_finish_seconds INT DEFAULT 0 NOT NULL;
ALTER TABLE citygames.question ADD auto_start_seconds INT DEFAULT 0 NOT NULL;