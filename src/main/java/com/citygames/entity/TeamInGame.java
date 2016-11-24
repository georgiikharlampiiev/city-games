package com.citygames.entity;


import javax.persistence.*;

@Entity
@Table(name="game_teams")
public class TeamInGame {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="approved")
    private boolean approved;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "GAME_ID")
    private Game game;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "TEAMS_ID")
    private Team teams;

    public Team getTeams(){
        return teams;
    }

}
