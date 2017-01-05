package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class CurrentQuestion {

  @Id
  private Long gameTeamId;

  @Column(name="QUESTION_ID")
  private Long questionId;

//  @OneToMany(fetch = FetchType.LAZY, mappedBy = "questionId", cascade = {CascadeType.MERGE})
//  private Set<Answer> answers;
}
