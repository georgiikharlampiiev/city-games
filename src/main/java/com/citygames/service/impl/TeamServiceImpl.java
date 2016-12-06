package com.citygames.service.impl;

import com.citygames.dto.TeamDTO;
import com.citygames.entity.Team;
import com.citygames.entity.TeamInGame;
import com.citygames.repository.TeamInGameRepository;
import com.citygames.repository.TeamRepository;
import com.citygames.service.GameService;
import com.citygames.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamInGameRepository teamInGameRepository;

    @Autowired
    private GameService gameService;

    @Override
    public Team add(Team team) {
        return teamRepository.saveAndFlush(team);
    }

    @Override
    public Team get(Long teamId) {
        return teamRepository.findOne(teamId);
    }

    @Override
    public void delete(long id) {
        teamRepository.delete(id);
    }

    @Override
    public Team edit(Team team) {
        return teamRepository.saveAndFlush(team);
    }

    @Override
    public List<Team> getAll() {
        return teamRepository.findAll();
    }

    @Override
    public List<TeamDTO> getAllTeamsForGame(Long gameId) {
        if (!gameService.isUserGameEditor(gameId)){
            return Collections.EMPTY_LIST;
        }

        List<TeamInGame> teamInGames = teamInGameRepository.findByGameId(gameId);
        List<TeamDTO> teamDTOS = teamInGames.stream()
                .map( tig -> new TeamDTO( tig.getTeams().getId(), tig.getTeams().getName(), tig.isApproved() ) )
                .collect(Collectors.toList());

        return teamDTOS;
    }

    @Override
    public Boolean addApproveGameForTeam(Long gameId, Long teamId) {
        if(teamId == null || gameId == null)
            return false;

        if (!gameService.isUserGameEditor(gameId)){
            return false;
        }

        TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(gameId, teamId);

        boolean approveStatus = teamInGame.isApproved();
        teamInGame.setApproved(!approveStatus);

        teamInGameRepository.save(teamInGame);

        return true;
    }
}
