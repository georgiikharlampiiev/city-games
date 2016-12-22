package com.citygames.service.impl;

import com.citygames.entity.Answer;
import com.citygames.entity.GameUser;
import com.citygames.entity.Question;
import com.citygames.entity.TeamAnswer;
import com.citygames.repository.QuestionRepository;
import com.citygames.repository.TeamAnswerRepository;
import com.citygames.service.QuestionService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

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
            for(Answer a : q.getAnswers()){
                Optional<TeamAnswer> teamAnswerFiltered = teamAnswers.stream().filter(teamAnswer -> teamAnswer.getAnswer().equalsIgnoreCase(a.getName())).findFirst();
                if( !teamAnswerFiltered.isPresent() ){
                    a.setName("***");
                }
            }
        }

        return questions;
    }

    @Override
    public Question getCurrentQuestionForCurrentGameLiner(Long id) {
        Question question = new Question();
        question.setName("Test name");
        return question;
    }
}
