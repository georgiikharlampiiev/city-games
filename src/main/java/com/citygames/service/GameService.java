package com.citygames.service;

import com.citygames.entity.Game;

import java.util.List;

public interface GameService {

    Game add(Game game);

    void delete(long id);

    Game edit(Game game);

    List<Game> getAll();

    List<Game> getAllActiveGames(int page, int pageSize);

    List<Game> getAllGames(int page, int pageSize);

    Game getGameById(Long id);

    Boolean addApplyGameByCurrentUser(Long gameId);

    Boolean deleteApplyGameByCurrentUser(Long gameId);

    Boolean IsUserAppliedGame(Long gameId);

    Boolean isUserGameEditor(Long gameId);
}
