package com.citygames.dto;

import com.citygames.entity.Team;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class TeamDTO {
    private Long id;

    private String name;

    private Boolean approved;

    private Set<UserDTO> users;

    public TeamDTO() {
    }

    public TeamDTO(Long id, String name, Boolean approved){
        this.id = id;
        this.name = name;
        this.approved = approved;
    }

    public TeamDTO(Team team){
        this.id = team.getId();
        this.name = team.getName();
        this.users = team.getGameUser().stream().map(UserDTO::new).collect(Collectors.toSet());
    }
}
