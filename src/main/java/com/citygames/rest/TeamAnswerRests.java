package com.citygames.rest;


import com.citygames.dto.TeamAnswerDTO;
import com.citygames.service.TeamAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TeamAnswerRests {

    @Autowired
    private TeamAnswerService teamAnswerService;

    @RequestMapping(value = "/addAnswer", method= RequestMethod.POST)
    public TeamAnswerDTO getGames(@RequestBody TeamAnswerDTO teamAnswerDTO) {
        return teamAnswerService.add(teamAnswerDTO);
    }

}
