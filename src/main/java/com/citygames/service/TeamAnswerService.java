package com.citygames.service;

import com.citygames.dto.TeamAnswerDTO;
import com.citygames.entity.TeamAnswer;

import java.util.List;

public interface TeamAnswerService {

    TeamAnswer add(TeamAnswer teamAnswer);

    void delete(long id);

    TeamAnswer edit(TeamAnswer team);

    List<TeamAnswer> getAllAnswerForTeamAndGame(Long teamId, Long gameId);


}
