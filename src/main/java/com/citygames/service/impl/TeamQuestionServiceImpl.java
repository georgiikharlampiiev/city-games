package com.citygames.service.impl;

import com.citygames.entity.*;
import com.citygames.repository.*;
import com.citygames.service.TeamQuestionService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TeamQuestionServiceImpl implements TeamQuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TeamQuestionRepository teamQuestionRepository;

    @Autowired
    private TeamInGameRepository teamInGameRepository;

    @Autowired
    private TeamAnswerRepository teamAnswerRepository;

    @Autowired
    private SecurityUtilsService securityUtilsService;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public TeamQuestion add (TeamQuestion teamQuestion){
        return teamQuestionRepository.saveAndFlush(teamQuestion);
    }

    @Override
    public TeamQuestion edit(TeamQuestion teamQuestion) {
        return teamQuestionRepository.saveAndFlush(teamQuestion);
    }

    @Override
    public void delete(long id) {
        teamQuestionRepository.delete(id);
    }

    @Override
    public TeamQuestion setNextTeamQuestionForLinerGame(Long gameId) {
        Game game = gameRepository.findOne(gameId);
        TeamInGame teamInGame = getTeamInGame(game);
        if (teamInGame != null) {
            TeamQuestion teamQuestion = teamQuestionRepository.findByGameTeamId(teamInGame.getId());
            if (teamQuestion != null) {
                Question question = questionRepository.findOne(teamQuestion.getQuestionId());
                Question nextQuestion = questionRepository.findByGameIdAndOrderInGame(gameId,
                        new Integer(question.getOrderInGame().intValue()+1));
                if (nextQuestion == null){
                    teamQuestionRepository.delete(teamQuestion.getGameTeamId());
                    return new TeamQuestion();
                }
                teamQuestion.setQuestionId(nextQuestion.getId());
                teamQuestion.setStartDate(new Date());
                edit(teamQuestion);
                return teamQuestion;
            }

        }
        return new TeamQuestion();
    }

    @Override
    public void setFirstTeamQuestionForLinerGame(Long gameId) {
        Game game = gameRepository.findOne(gameId);
        TeamInGame teamInGame = getTeamInGame(game);
        if (teamInGame != null) {
            TeamQuestion teamQuestion = teamQuestionRepository.findByGameTeamId(teamInGame.getId());
            if (teamQuestion == null) {
                Question firstQuestion = questionRepository.findByGameIdOrderByOrderInGameAsc(game.getId()).iterator().next();
                TeamQuestion firstTeamQuestion = new TeamQuestion();
                firstTeamQuestion.setGameTeamId(teamInGame.getId());
                firstTeamQuestion.setQuestionId(firstQuestion.getId());
                firstTeamQuestion.setStartDate(new Date());
                add(firstTeamQuestion);
            }
        }
    }

    @Override
    public TeamQuestion getCurrentTeamQuestionForLinerGame(Long gameId) {
        Game game = gameRepository.findOne(gameId);
        TeamInGame teamInGame = getTeamInGame(game);
        if (teamInGame != null) {
            return teamQuestionRepository.findByGameTeamId(teamInGame.getId());
        }
        return null;
    }

    private TeamInGame getTeamInGame(Game game) {
        GameUser user = securityUtilsService.getCurrentUser();
        if (user != null && user.getTeamId() != null) {
            Team team = teamRepository.findOne(user.getTeamId());

            if (team != null) {
                return teamInGameRepository.findByGameIdAndTeamsId(game.getId(), team.getId());
            }
        }
        return null;
    }
}
