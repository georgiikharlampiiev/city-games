package com.citygames.dto;

import lombok.Data;

import java.util.Set;

@Data
public class QuestionDTO {
  private Integer orderInGame;

  private String name;

  private String description;

  private Integer score;

  private Integer autoStartSeconds;

  private Integer autoFinishSeconds;

  private Set<String> answers;
}
