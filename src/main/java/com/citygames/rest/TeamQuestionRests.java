package com.citygames.rest;

import com.citygames.entity.Question;
import com.citygames.entity.TeamQuestion;
import com.citygames.service.TeamQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TeamQuestionRests {

    @Autowired
    private TeamQuestionService teamQuestionService;

    @RequestMapping("/getNextTeamQuestionsForCurrentGameLiner/{id}")
    public TeamQuestion getNextTeamQuestionsForCurrentGameLiner(@PathVariable Long id) {
        return teamQuestionService.setNextTeamQuestionForLinerGame(id);
    }


    @RequestMapping("/getCurrentTeamQuestionForCurrentLinerGame/{id}")
    public TeamQuestion getCurrentTeamQuestionForCurrentLinerGame(@PathVariable Long id) {
        return teamQuestionService.getCurrentTeamQuestionForLinerGame(id);
    }
}
