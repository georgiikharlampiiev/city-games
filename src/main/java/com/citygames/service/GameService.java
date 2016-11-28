package com.citygames.service;

import com.citygames.dto.GameDTO;
import com.citygames.entity.Game;
import com.citygames.entity.TypeGame;

import java.util.List;

public interface GameService {

    Game add(Game game);

    void delete(long id);

    Game edit(Game game);

    List<Game> getAll();

    List<GameDTO> getAllActiveGames(int page, int pageSize);

    List<Game> getAllDisableGames(int page, int pageSize);

    List<Game> getAllGames(int page, int pageSize);

    List<TypeGame> getAllGameTypes();

    Game getGameById(Long id);

    Boolean addApplyGameByCurrentUser(Long gameId);

    Boolean deleteApplyGameByCurrentUser(Long gameId);

    Boolean IsUserAppliedGame(Long gameId);

    Boolean IsUserApprovedForGame(Long gameId);

    Boolean isUserGameEditor(Long gameId);
}
