package com.citygames.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "answer")
public class Answer {

  private @Id @GeneratedValue Long id;

  private String name;

  @Column(name="QUESTION_ID")
  private Long questionId;

  private Long nextQuestion;

}
