package com.citygames.service;

import com.citygames.entity.Question;

import java.util.List;

public interface QuestionService {

    List<Question> getQuestionsForCurrentGameStorm(Long id);

    Question getCurrentQuestionForCurrentGameLiner(Long id);

    Question getQuestionById(Long id);
}
