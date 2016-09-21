package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class UserTeam {

    private @Id @GeneratedValue Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Set<User> users;

    @ManyToOne
    @JoinColumn(name = "id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "id")
    private RoleTeam  roleTeam;
}
