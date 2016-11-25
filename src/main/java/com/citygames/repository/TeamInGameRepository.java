package com.citygames.repository;

import com.citygames.entity.Game;
import com.citygames.entity.TeamInGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(exported = false)
public interface TeamInGameRepository extends JpaRepository<TeamInGame, Long> {

    TeamInGame findByGameIdAndTeamsId(Long gameId, Long teamsId);

}

