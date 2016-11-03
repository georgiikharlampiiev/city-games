package com.citygames.rest;

import com.citygames.entity.Game;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GameRests {

    @RequestMapping("/allapi/getGames")
    public List<Game> greeting() {
        List<Game> games = new ArrayList<>();
        games.add(new Game(1l,"name1","desk1"));
        games.add(new Game(2l,"name2","desk2"));
        games.add(new Game(3l,"name3","desk3"));
        games.add(new Game(4l,"name4","desk4"));
        games.add(new Game(5l,"name5","desk5"));

        return games;
    }
}
