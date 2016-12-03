package com.citygames.service.impl;

import com.citygames.entity.TeamAnswer;
import com.citygames.repository.TeamAnswerRepository;
import com.citygames.service.TeamAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TeamAnswerServiceImpl implements TeamAnswerService {

    @Autowired
    TeamAnswerRepository teamAnswerRepository;

    @Override
    public TeamAnswer add(TeamAnswer teamAnswer) {

        return teamAnswerRepository.saveAndFlush(teamAnswer);
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
