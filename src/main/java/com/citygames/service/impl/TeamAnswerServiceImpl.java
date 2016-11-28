package com.citygames.service.impl;

import com.citygames.dto.TeamAnswerDTO;
import com.citygames.entity.TeamAnswer;
import com.citygames.service.TeamAnswerService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TeamAnswerServiceImpl implements TeamAnswerService {


    @Override
    public TeamAnswerDTO add(TeamAnswerDTO teamAnswerDTO) {
        return null;
    }

    @Override
    public void delete(long id) {

    }

    @Override
    public TeamAnswer edit(TeamAnswer team) {
        return null;
    }

    @Override
    public List<TeamAnswer> getAllAnswerForTeamAndGame(Long teamId, Long gameId) {
        return null;
    }
}
