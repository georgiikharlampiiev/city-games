package com.citygames.dto;

import com.citygames.entity.TeamAnswer;
import lombok.Data;

@Data
public class TeamAnswerDTO {
    private Long id;

    private String answer;

    private Long teamId;

    private Long gameId;

    private Boolean correct;

    public static TeamAnswerDTO convetToDTO(TeamAnswer teamAnswer){
        TeamAnswerDTO teamAnswerDTO = new TeamAnswerDTO();

        teamAnswerDTO.setAnswer(teamAnswer.getAnswer());
        teamAnswerDTO.setCorrect(teamAnswer.isCorrect());

        return teamAnswerDTO;
    }

}
