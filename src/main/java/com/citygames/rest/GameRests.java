package com.citygames.rest;

import com.citygames.dto.GameDTO;
import com.citygames.entity.Game;
import com.citygames.entity.TypeGame;
import com.citygames.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GameRests {

    @Autowired
    private GameService gameService;

    @RequestMapping("/getGames")
    public List<GameDTO> getGames() {
        return gameService.getAllActiveGames(0,10); //TODO: Add pagination!!!!!!
    }

    @RequestMapping("/getTypeGames")
    public List<TypeGame> getTypeGames() {
        return gameService.getAllGameTypes(); //TODO: Add pagination!!!!!!
    }

    @RequestMapping(value = "/addGame", method= RequestMethod.POST)
    public Game getGames(@RequestBody Game game) {
        return gameService.add(game);
    }

    @RequestMapping("/getGame/{id}")
    public Game getGameById(@PathVariable Long id) {
        return gameService.getGameById(id);
    }

    @RequestMapping("/applyGameByCurrentUser/{id}")
    public Boolean getApplyGameByCurrentUser(@PathVariable Long id) {
        return gameService.addApplyGameByCurrentUser(id);
    }

    @RequestMapping("/deleteApplyGameByCurrentUser/{id}")
    public Boolean getDeleteApplyGameByCurrentUser(@PathVariable Long id) {
        return gameService.deleteApplyGameByCurrentUser(id);
    }

    @RequestMapping("/isUserAppliedGame/{id}")
    public Boolean isUserAppliedGame(@PathVariable Long id) {
        return gameService.IsUserAppliedGame(id);
    }

    @RequestMapping("/isUserApprovedForGame/{id}")
    public Boolean isUserApprovedForGame(@PathVariable Long id) {
        return gameService.IsUserApprovedForGame(id);
    }

    @RequestMapping("/isUserGameEditor/{id}")
    public Boolean isUserGameEditor(@PathVariable Long id) {
        return gameService.isUserGameEditor(id);
    }
}
