package com.citygames.rest;

import com.citygames.dto.UserDTO;
import com.citygames.entity.Game;
import com.citygames.entity.GameUser;
import com.citygames.service.GameService;
import com.citygames.service.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping(value = "/registerUser", method = RequestMethod.POST)
    public GameUser registerUser(@RequestBody UserDTO newUser) {
        GameUser gameUser = new GameUser();
        if (!newUser.getName().isEmpty() && !newUser.getEmail().isEmpty() && !newUser.getPassword().isEmpty()) {
            if (gameUserService.getByName(newUser.getName()) == null) {
                if (gameUserService.getByEmail(newUser.getEmail()) == null) {
                    gameUser.setName(newUser.getName());
                    gameUser.setEmail(newUser.getEmail());
                    gameUser.setPassword(newUser.getPassword());
                    gameUserService.add(gameUser);
                } else throw new RuntimeException("This email has been used!");
            } else throw new RuntimeException("The user has been registered already!");
        } else throw new RuntimeException("All the fields must be filled in!");
        return gameUser;
    }
}
