package com.citygames.rest;


import com.citygames.dto.UserDTO;
import com.citygames.entity.GameUser;
import com.citygames.service.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping(value="/setUserProfile", method= RequestMethod.POST)
    public GameUser setGameUser(@RequestBody UserDTO gameUserDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        GameUser currentUser = gameUserService.getByName(name);

        if( currentUser.getId().equals(gameUserDto.getId()) ){
            currentUser.setName(gameUserDto.getName());
            if( gameUserDto.getPassword() != null ) {
                currentUser.setPassword( gameUserDto.getPassword() );
            }
            return gameUserService.edit(currentUser);
        }

        return currentUser;
    }

}
