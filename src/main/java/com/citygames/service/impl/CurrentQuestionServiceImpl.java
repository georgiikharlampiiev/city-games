package com.citygames.service.impl;

import com.citygames.entity.*;
import com.citygames.repository.CurrentQuestionRepository;
import com.citygames.repository.QuestionRepository;
import com.citygames.repository.TeamAnswerRepository;
import com.citygames.repository.TeamInGameRepository;
import com.citygames.service.CurrentQuestionService;
import com.citygames.service.QuestionService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
    public void setNextCurrentQuestionForLinerGame(TeamInGame teamInGame, Game game) {
        CurrentQuestion currentQuestion = currentQuestionRepository.findByGameTeamId(teamInGame.getId());
        if (currentQuestion != null) {
            edit(currentQuestion);
        }
    }

    @Override
    public void setFirstQuestionForLinerGame(TeamInGame teamInGame, Game game) {
        CurrentQuestion currentQuestion = currentQuestionRepository.findByGameTeamId(teamInGame.getId());
        if (currentQuestion == null) {
            Question firstQuestion = questionRepository.findByGameIdOrderByOrderInGameAsc(game.getId()).iterator().next();
            CurrentQuestion firstCurrentQuestion = new CurrentQuestion();
            firstCurrentQuestion.setGameTeamId(teamInGame.getId());
            firstCurrentQuestion.setQuestionId(firstQuestion.getId());
            add(firstCurrentQuestion);
        }
    }
}
