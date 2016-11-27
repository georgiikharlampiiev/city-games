package com.citygames.repository;

import com.citygames.entity.TeamInGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(exported = false)
public interface TeamInGameRepository extends JpaRepository<TeamInGame, Long> {

    TeamInGame findByGameIdAndTeamsId(Long gameId, Long teamsId);

    List<TeamInGame> findByGameId(Long gameId);

}

