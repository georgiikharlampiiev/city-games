package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Game {

  private @Id @GeneratedValue Long id;

  private String name;

  private String description;

  private Date dataStart;

  private Date dataFinish;

  @OneToMany(mappedBy = "game")
  private Set<Team> teams;

  @ManyToOne
  @JoinTable(name = "game_admin",
      joinColumns = @JoinColumn(name = "id_game"),
      inverseJoinColumns = @JoinColumn(name = "id_user"))
  private User user;

}
