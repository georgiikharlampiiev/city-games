package com.citygames.dto;

import lombok.Data;

@Data
public class TeamAnswerDTO {
    private Long id;

    private String answer;

    private Long teamId;

    private Long gameId;

    private Boolean correct;

}
