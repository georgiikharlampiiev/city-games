package com.citygames.service;

import com.citygames.entity.TeamQuestion;
import com.citygames.entity.Question;

public interface TeamQuestionService {

    TeamQuestion add(TeamQuestion teamQuestion);

    TeamQuestion edit(TeamQuestion teamQuestion);

    void delete(long id);

    void setFirstTeamQuestionForLinerGame(Long gameId);

    TeamQuestion setNextTeamQuestionForLinerGame(Long gameId);

    TeamQuestion getCurrentTeamQuestionForLinerGame(Long gameId);

}
