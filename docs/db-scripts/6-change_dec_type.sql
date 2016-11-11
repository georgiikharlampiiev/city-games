ALTER TABLE `game` CHANGE COLUMN `image` `image` LONGTEXT NULL;
ALTER TABLE `game`CHANGE COLUMN `description` `description` TEXT NULL ;

ALTER TABLE `game`
  CHANGE COLUMN `data_start` `date_start` DATETIME NULL DEFAULT NULL,
  CHANGE COLUMN `data_finish` `date_finish` DATETIME NULL DEFAULT NULL;