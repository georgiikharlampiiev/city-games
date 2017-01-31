package com.citygames.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Question {

  private @Id @GeneratedValue Long id;

  private Integer orderInGame;

  private String name;

  private String description;

  @Column(name="GAME_ID")
  private long gameId;

  private Integer score;

  private Integer autoStartSeconds;

  private Integer autoFinishSeconds;

  private Integer blockNumber;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "questionId", cascade = {CascadeType.MERGE})
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Set<Answer> answers;
}
