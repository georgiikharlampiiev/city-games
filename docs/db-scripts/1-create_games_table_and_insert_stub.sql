CREATE TABLE IF NOT EXISTS `game` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `data_start` datetime DEFAULT NULL,
  `data_finish` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `game_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


INSERT INTO `game` (`id`, `name`, `description`, `data_start`, `data_finish`) VALUES
	(1, 'Geme number 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.', NULL, NULL),
	(2, 'Geme number 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.', NULL, NULL),
	(3, 'Geme number 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.', NULL, NULL),
	(4, 'Geme number 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.', NULL, NULL),
	(5, 'Geme number 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.', NULL, NULL);


CREATE TABLE IF NOT EXISTS `game_game_admins` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `game_id` bigint(20) NOT NULL,
  `game_admins_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `game_game_admins_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `team` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `team` (`id`, `name`) VALUES
	(1, 'Team1'),
	(2, 'Team2');

CREATE TABLE IF NOT EXISTS `game_teams` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `teams_id` bigint(20) NOT NULL,
  `game_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `game_teams_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


