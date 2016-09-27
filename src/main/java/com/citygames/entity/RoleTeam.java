package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class RoleTeam {

    private @Id @GeneratedValue Long id;

    private String role;

    @ManyToOne
    @JoinTable(name = "user_team",
        joinColumns = @JoinColumn(name = "id_team_role"),
        inverseJoinColumns = @JoinColumn(name = "id_team") )
    private Team team;

    @OneToMany(mappedBy = "roleTeam")
    private Set<User> users;
}
