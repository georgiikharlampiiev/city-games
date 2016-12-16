package com.citygames.rest;


import com.citygames.dto.TeamDTO;
import com.citygames.dto.UserDTO;
import com.citygames.entity.GameUser;
import com.citygames.entity.Team;
import com.citygames.service.GameUserService;
import com.citygames.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GameUserRests {

    @Autowired
    private GameUserService gameUserService;

    @Autowired
    private TeamService teamService;

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

    @RequestMapping(value="/setTeam", method= RequestMethod.POST)
    public GameUser setTeam(@RequestBody UserDTO gameUserDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        GameUser currentUser = gameUserService.getByName(name);
        if (currentUser.getId().equals(gameUserDto.getId())){
            currentUser.setTeamId(gameUserDto.getTeamId());
            currentUser.setRoleTeam(gameUserDto.getRoleTeam());
            return gameUserService.edit(currentUser);
        }
        return currentUser;
    }

    @RequestMapping("/getTeam")
    public TeamDTO getTeam() {
        return gameUserService.getUserTeam(null);
    }

    @RequestMapping("/approveUserForTeam/{userId}")
    public UserDTO approveUserForTeam(@PathVariable Long userId) {
        return gameUserService.setUserTeamRole(userId);
    }

}
