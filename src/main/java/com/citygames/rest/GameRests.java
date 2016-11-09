package com.citygames.rest;

import com.citygames.entity.Game;
import com.citygames.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GameRests {

    @Autowired
    private GameService gameService;

    @RequestMapping("/getGames")
    public List<Game> getGames() {
        return gameService.getAll();
    }

    @RequestMapping("/getGame/{id}")
    public Game getGameById(@PathVariable Long id) {
        return gameService.getGameById(id);
    }
}
