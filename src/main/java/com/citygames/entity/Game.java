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


    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "game")
    private Set<TeamInGame> teamInGame;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "game")
    private Set<GameAdmin> gameAdmins;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gameId", cascade = {CascadeType.MERGE})
    private Set<Question> questions;

    private String image;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<TypeGame> typeGames;

}