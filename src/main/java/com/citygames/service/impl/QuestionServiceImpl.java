package com.citygames.service.impl;

import com.citygames.entity.*;
import com.citygames.repository.*;
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
public class QuestionServiceImpl implements QuestionService {

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
    public List<Question> getQuestionsForCurrentGameStorm(Long id){
        GameUser gameUser =  securityUtilsService.getCurrentUser();

        if(gameUser == null){
            return Collections.EMPTY_LIST;
        }

        List<Question> questions = questionRepository.findByGameIdOrderByOrderInGameAsc(id);
        List<Long> questionIds = questions.stream().map(Question::getId).collect(Collectors.toList());

        List<TeamAnswer> teamAnswers = teamAnswerRepository.findByTeamIdAndQuestionIdIn(gameUser.getTeamId(), questionIds).stream().filter((TeamAnswer::isCorrect)).collect(Collectors.toList());

        for(Question q :questions){
            updateAnswers(teamAnswers, q);
        }

        return questions;
    }

    @Override
    public List<Question> getCurrentQuestionForCurrentGameLiner(Long id) {
        GameUser gameUser =  securityUtilsService.getCurrentUser();

        if(gameUser == null){
            return Collections.EMPTY_LIST;
        }

        TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(id, gameUser.getId());
        CurrentQuestion currentQuestion = currentQuestionRepository.findByGameTeamId(teamInGame.getId());

        List<Question> questions = new ArrayList<>();
        questions.add(questionRepository.findOne(currentQuestion.getQuestionId()));

        List<Long> questionIds = questions.stream().map(Question::getId).collect(Collectors.toList());

        List<TeamAnswer> teamAnswers = teamAnswerRepository.findByTeamIdAndQuestionIdIn(gameUser.getTeamId(), questionIds).stream().filter((TeamAnswer::isCorrect)).collect(Collectors.toList());

        for(Question q :questions){
            updateAnswers(teamAnswers, q);
        }

        return questions;
    }

    private void updateAnswers(List<TeamAnswer> teamAnswers, Question q){
        for(Answer a : q.getAnswers()){
            Optional<TeamAnswer> teamAnswerFiltered = teamAnswers.stream().filter(teamAnswer -> teamAnswer.getAnswer().equalsIgnoreCase(a.getName())).findFirst();
            if( !teamAnswerFiltered.isPresent() ){
                a.setName("***");
            }
        }
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findOne(id);
    }
}
