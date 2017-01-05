package com.citygames.rest;

import com.citygames.entity.CurrentQuestion;
import com.citygames.entity.Question;
import com.citygames.service.CurrentQuestionService;
import com.citygames.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CurrentQuestionRests {

    @Autowired
    private CurrentQuestionService currentQuestionService;

    @RequestMapping("/setNewCurrentQuestionsForCurrentGameLiner/{id}")
    public Question setNewCurrentQuestionsForCurrentGameLiner(@PathVariable Long id) {
        return currentQuestionService.setNextCurrentQuestionForLinerGame(id);
    }

//    @RequestMapping("/getCurrentQuestionsForCurrentGameLiner/{id}")
//    public CurrentQuestion setNewCurrentQuestionsForCurrentGameLiner(@PathVariable Long id) {
//        return currentQuestionService.setNextCurrentQuestionForLinerGame(id);
//    }
}
