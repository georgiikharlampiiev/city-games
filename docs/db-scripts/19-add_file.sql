CREATE TABLE citygames.file
(
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  data LONGBLOB
);
CREATE UNIQUE INDEX file_id_uindex ON citygames.file (id);

ALTER TABLE citygames.question ADD file_id BIGINT NULL;

ALTER TABLE citygames.answer ADD file_id BIGINT NULL;