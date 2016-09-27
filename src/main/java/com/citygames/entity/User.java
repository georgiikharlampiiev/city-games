package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class User {

    private @Id @GeneratedValue Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "id_role")
    private UserRole role;

    @OneToMany(mappedBy = "user")
    private Set<Team> teams;

    @ManyToOne
    @JoinTable(name = "user_team",
        joinColumns = @JoinColumn(name = "id_user"),
        inverseJoinColumns = @JoinColumn(name = "id_team_role") )
    private RoleTeam roleTeam;

    @OneToMany(mappedBy = "user")
    private Set<Game> games;
}