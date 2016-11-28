DROP TABLE IF EXISTS `type_game`;
CREATE TABLE IF NOT EXISTS `type_game` (
  `id` INTEGER(20) unsigned NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;