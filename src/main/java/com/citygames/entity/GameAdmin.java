package com.citygames.entity;

import javax.persistence.*;

@Entity
@Table(name="game_game_admins")
public class GameAdmin {

    @Id
    @GeneratedValue
    private Long id;

//    @Column(name="deleted")
//    private boolean deleted;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "GAME_ID")
    private Game game;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "GAME_ADMINS_ID")
    private GameUser gameUser;


    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public GameUser getGameUser() {
        return gameUser;
    }

    public void setGameUser(GameUser gameUser) {
        this.gameUser = gameUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
