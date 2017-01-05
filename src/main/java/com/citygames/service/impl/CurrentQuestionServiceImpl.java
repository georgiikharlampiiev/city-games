package com.citygames.service.impl;

import com.citygames.entity.*;
import com.citygames.repository.*;
import com.citygames.service.CurrentQuestionService;
import com.citygames.service.QuestionService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CurrentQuestionServiceImpl implements CurrentQuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CurrentQuestionRepository currentQuestionRepository;

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
    public CurrentQuestion add (CurrentQuestion currentQuestion){
        return currentQuestionRepository.saveAndFlush(currentQuestion);
    }

    @Override
    public CurrentQuestion edit(CurrentQuestion currentQuestion) {
        return currentQuestionRepository.saveAndFlush(currentQuestion);
    }

    @Override
    public void delete(long id) {
        currentQuestionRepository.delete(id);
    }

    @Override
    public Question setNextCurrentQuestionForLinerGame(Long gameId) {
        Game game = gameRepository.findOne(gameId);
        TeamInGame teamInGame = getTeamInGame(game);
        if (teamInGame != null) {
            CurrentQuestion currentQuestion = currentQuestionRepository.findByGameTeamId(teamInGame.getId());
            if (currentQuestion != null) {
                Question question = questionRepository.findOne(currentQuestion.getQuestionId());
                Question nextQuestion = questionRepository.findOne(new Long(question.getOrderInGame().intValue()+1));
                if (nextQuestion == null){
                    currentQuestionRepository.delete(currentQuestion.getGameTeamId());
                }
                currentQuestion.setQuestionId(nextQuestion.getId());
                edit(currentQuestion);
                return nextQuestion;
            }

        }
        return null;
    }

    @Override
    public void setFirstQuestionForLinerGame(Long gameId) {
        Game game = gameRepository.findOne(gameId);
        TeamInGame teamInGame = getTeamInGame(game);
        if (teamInGame != null) {
            CurrentQuestion currentQuestion = currentQuestionRepository.findByGameTeamId(teamInGame.getId());
            if (currentQuestion == null) {
                Question firstQuestion = questionRepository.findByGameIdOrderByOrderInGameAsc(game.getId()).iterator().next();
                CurrentQuestion firstCurrentQuestion = new CurrentQuestion();
                firstCurrentQuestion.setGameTeamId(teamInGame.getId());
                firstCurrentQuestion.setQuestionId(firstQuestion.getId());
                firstCurrentQuestion.setStartDate(new Date());
                add(firstCurrentQuestion);
            }
        }
    }

    @Override
    public CurrentQuestion getCurrentQuestionForLinerGame(Long gameId) {
        Game game = gameRepository.findOne(gameId);
        TeamInGame teamInGame = getTeamInGame(game);
        if (teamInGame != null) {
            return currentQuestionRepository.findByGameTeamId(teamInGame.getId());
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
