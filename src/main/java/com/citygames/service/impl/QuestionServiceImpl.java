package com.citygames.service.impl;

import com.citygames.entity.*;
import com.citygames.repository.*;
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
    private TeamQuestionRepository teamQuestionRepository;

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
    public Question getCurrentQuestionForCurrentGameLiner(Long teamId) {
        GameUser gameUser =  securityUtilsService.getCurrentUser();

        if(gameUser == null){
            return null;
        }

        TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(teamId, gameUser.getId());
        TeamQuestion teamQuestion = teamQuestionRepository.findByGameTeamId(teamInGame.getId());

        Question question = questionRepository.findOne(teamQuestion.getQuestionId());

        List<Long> questionIds = new ArrayList<>();
        questionIds.add(question.getId());

        List<TeamAnswer> teamAnswers = teamAnswerRepository.findByTeamIdAndQuestionIdIn(gameUser.getTeamId(), questionIds).stream().filter((TeamAnswer::isCorrect)).collect(Collectors.toList());

        updateAnswers(teamAnswers, question);

        return question;
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
    public Question getQuestionForCurrentGameLiner(Long id) {
        return questionRepository.findOne(id);
    }

    @Override
    public Question getQuestionForLinerGameById(Long id) {

        GameUser gameUser =  securityUtilsService.getCurrentUser();

        if(gameUser == null){
            return null;
        }

        Question question = questionRepository.findOne(id);

        List<Long> questionIds = new ArrayList<>();
        questionIds.add(question.getId());

        List<TeamAnswer> teamAnswers = teamAnswerRepository.findByTeamIdAndQuestionIdIn(gameUser.getTeamId(), questionIds).stream().filter((TeamAnswer::isCorrect)).collect(Collectors.toList());

        updateAnswers(teamAnswers, question);

        return question;
    }
}
