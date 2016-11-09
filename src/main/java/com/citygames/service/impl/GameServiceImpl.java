package com.citygames.service.impl;

import com.citygames.entity.Game;
import com.citygames.repository.GameRepository;
import com.citygames.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private GameRepository gameRepository;

    @Override
    public Game add(Game game) {
        return gameRepository.saveAndFlush(game);
    }

    @Override
    public void delete(long id) {
        gameRepository.delete(id);
    }

    @Override
    public Game edit(Game game) {
        return gameRepository.saveAndFlush(game);
    }

    @Override
    public List<Game> getAll() {
        return gameRepository.findAll();
    }

    @Override
    public List<Game> getAllGames(int page, int pageSize){
        TypedQuery query = em.createQuery("select g from Game g", Game.class);

        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }

    @Override
    public Game getGameById(Long id){
        return gameRepository.findOne(id);
    }

}
