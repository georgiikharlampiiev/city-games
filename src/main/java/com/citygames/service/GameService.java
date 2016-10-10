package com.citygames.service;

import com.citygames.entity.Game;
import java.util.List;

public interface GameService {

    Game add(Game game);

    void delete(long id);

    Game edit(Game game);

    List<Game> getAll();

}
