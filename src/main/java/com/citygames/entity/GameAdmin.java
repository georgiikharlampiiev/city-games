package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class GameAdmin {

    private @Id @GeneratedValue Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Set<Game> games;

    @ManyToOne
    @JoinColumn(name = "id")
    private Set<User> users;

    private String roleGame;

}
