package com.citygames.dto;

import com.citygames.entity.Answer;
import lombok.Data;

import javax.persistence.*;
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
