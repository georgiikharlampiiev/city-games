package com.citygames.entity;

import lombok.Data;


import javax.persistence.*;
import java.util.Set;


@Data
@Entity
public class Team {

    private @Id @GeneratedValue Long id;

    private String name;

    @ManyToOne
    @JoinTable(name="user_team",
        joinColumns = @JoinColumn(name = "id_team"),
        inverseJoinColumns = @JoinColumn(name = "id_user") )
    private User user;

    @OneToMany(mappedBy = "team")
    private Set<RoleTeam> rolesTeam;

    @ManyToOne
    @JoinTable(name = "game_team",
        joinColumns = @JoinColumn(name = "id_team"),
        inverseJoinColumns = @JoinColumn(name = "Id_game"))
    private Game game;
}
