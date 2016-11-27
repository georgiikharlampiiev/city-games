package com.citygames.entity;

import lombok.Data;


import javax.persistence.*;
import java.util.Set;


@Data
@Entity
public class Team {

    private @Id @GeneratedValue Long id;

    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "teams", orphanRemoval = true)
    private Set<TeamInGame> teamInGame;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name="TEAM_ID", referencedColumnName="ID")
    private Set<GameUser> gameUser;

}
