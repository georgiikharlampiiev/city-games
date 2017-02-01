package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
public class TeamQuestion {

  @Id
  private Long gameTeamId;

  @Column(name="QUESTION_ID")
  private Long questionId;

  @Column(name="START_DATE")
  private Date startDate;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = {CascadeType.MERGE})
  private Set<TeamAnswer> answers;
}
