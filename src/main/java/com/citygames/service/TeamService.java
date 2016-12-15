package com.citygames.service;


import com.citygames.dto.TeamDTO;
import com.citygames.entity.Team;
import java.util.List;

public interface TeamService {

    Team add(Team team);

    Team get(Long teamId);

    void delete(long id);

    Team edit(Team team);

    List<Team> getAll();

    List<TeamDTO> getAllTeamsForGame(Long gameId);

    Boolean addApproveGameForTeam(Long gameId, Long teamId);

    Team getTeamByName(String name);

}
