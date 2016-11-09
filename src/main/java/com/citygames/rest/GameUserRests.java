package com.citygames.rest;


import com.citygames.entity.GameUser;
import com.citygames.entity.Team;
import com.citygames.service.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameUserRests {

    @Autowired
    private GameUserService gameUserService;

    @RequestMapping("/getUserProfile")
    public GameUser getGameUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();

        return gameUserService.getByName(name);
    }

//    @RequestMapping("/getCurrentUserTeam")
//    public Team getCurrentUserTeam() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String name = auth.getName();
//
//        return gameUserService.getByName(name).getTeams;
//    }
}
