package com.citygames.rest;


import com.citygames.dto.TeamAnswerDTO;
import com.citygames.entity.TeamAnswer;
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

    @RequestMapping(value = "/addAnswer", method = RequestMethod.POST)
    public TeamAnswerDTO addAnswer(@RequestBody TeamAnswerDTO teamAnswerDTO) {
        return TeamAnswerDTO.convetToDTO(teamAnswerService.add(teamAnswerDTO));
    }

}
