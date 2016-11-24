package com.citygames.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Game {

    private
    @Id
    @GeneratedValue
    Long id;

    private String name;

    private String description;

    private Date dateStart;

    private Date dateFinish;

    private boolean disabled;

    @OneToMany(mappedBy = "game")
    private Set<TeamInGame> teamInGame;

    @OneToMany
    private Set<GameUser> gameAdmins;

    @OneToMany(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "GAME_ID", referencedColumnName = "ID")
    private Set<Question> questions;

    private String image;
}