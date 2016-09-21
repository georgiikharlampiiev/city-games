package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class GameTeam {

    private @Id @GeneratedValue Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "id")
    private Team team;

    private String status;
}
