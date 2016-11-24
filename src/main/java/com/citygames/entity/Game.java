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

    @OneToMany(fetch = FetchType.EAGER)
    private Set<GameUser> gameAdmins;

    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "GAME_ID", referencedColumnName = "ID")
    private Set<Question> questions;

    private String image;
}