package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "answer")
public class Answer {

  private @Id @GeneratedValue Long id;

  private String name;

  private String answerTags;

  @Column(name="QUESTION_ID")
  private Long questionId;

  private Long nextQuestion;

  private Integer score;

  private Boolean isCloseQuestion;

  @Column(name="FILE_ID")
  private Long fileId;

}
