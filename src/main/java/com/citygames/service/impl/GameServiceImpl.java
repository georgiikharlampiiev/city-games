package com.citygames.service.impl;

import com.citygames.entity.Game;
import com.citygames.repository.GameRepository;
import com.citygames.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private GameRepository gameRepository;

    public Game add(Game game) {
        return gameRepository.saveAndFlush(game);
    }

    public void delete(long id) {
        gameRepository.delete(id);
    }

    public Game edit(Game game) {
        return gameRepository.saveAndFlush(game);
    }

    public List<Game> getAll() {
        return gameRepository.findAll();
    }
}
