package com.citygames.dto;

import com.citygames.entity.GameUser;
import com.citygames.entity.RoleTeam;
import lombok.Data;

import javax.persistence.*;

@Data
public class UserDTO {

    private Long id;

    private String name;

    private String email;

    private String password;

    private Long teamId;

    private RoleTeam roleTeam;

    public UserDTO(){}

    public UserDTO(GameUser user){
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.roleTeam = user.getRoleTeam();
    }

}
