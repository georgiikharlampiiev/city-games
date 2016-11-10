package com.citygames.rest;


import com.citygames.entity.Team;
import com.citygames.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TeamRests {

    @Autowired
    private TeamService teamService;

    @RequestMapping("/getAllTeams")
    public List<Team> getAllTeams() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();

        return teamService.getAll();
    }

}
