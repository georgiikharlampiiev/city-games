package com.citygames.dto;

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

}
