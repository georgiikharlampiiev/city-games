package com.citygames.service;

import com.citygames.entity.CurrentQuestion;
import com.citygames.entity.Game;
import com.citygames.entity.Question;
import com.citygames.entity.TeamInGame;

import java.util.List;

public interface CurrentQuestionService {

    CurrentQuestion add(CurrentQuestion currentQuestion);

    CurrentQuestion edit(CurrentQuestion currentQuestion);

    void delete(long id);

    void setFirstQuestionForLinerGame(TeamInGame teamInGame, Game game);

    void setNextCurrentQuestionForLinerGame(TeamInGame teamInGame, Game game);

}
