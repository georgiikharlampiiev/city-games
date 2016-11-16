package com.citygames.rest;

import com.citygames.entity.Game;
import com.citygames.entity.GameUser;
import com.citygames.service.GameService;
import com.citygames.service.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public/api")
public class PublicApiRest {

    @Autowired
    private GameService gameService;

    @Autowired
    private GameUserService gameUserService;

    @RequestMapping("/getGames")
    public List<Game> getGamesOnIndex() {
        return gameService.getAllActiveGames(0, 10);
    }

    @RequestMapping("/registerUser")
    public GameUser registerUser(GameUser gameUser) {
        return gameUserService.add(gameUser);
    }
}
