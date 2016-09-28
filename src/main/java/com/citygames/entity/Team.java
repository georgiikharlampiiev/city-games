package com.citygames.entity;

import lombok.Data;


import javax.persistence.*;
import java.util.Set;


@Data
@Entity
public class Team {

    private @Id @GeneratedValue Long id;

    private String name;

    @OneToMany
    private Set<GameUser> gameUser;

}
