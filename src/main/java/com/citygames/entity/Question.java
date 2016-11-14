package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Question {

  private @Id @GeneratedValue Long id;

  private Integer order;

  private String name;

  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "GAME_ID", nullable = false)
  private Game game;

}
