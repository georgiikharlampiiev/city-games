package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class GameAdmin {

    private @Id @GeneratedValue Long id;

    @OneToMany
    @JoinColumn(name = "id")
    private Set<GameUser> gameUsers;

    private String roleGame;

}
