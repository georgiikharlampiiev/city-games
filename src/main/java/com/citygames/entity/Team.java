package com.citygames.entity;

import lombok.Data;


import javax.persistence.*;
import java.util.Set;


@Data
@Entity
public class Team {

    private @Id @GeneratedValue Long id;

    private String name;

    @OneToMany(mappedBy = "teams")
    private Set<TeamInGame> teamInGame;

    @OneToMany
    @JoinColumn(name="TEAM_ID", referencedColumnName="ID")
    private Set<GameUser> gameUser;

}
