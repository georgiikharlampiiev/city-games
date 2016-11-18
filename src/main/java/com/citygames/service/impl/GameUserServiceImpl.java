package com.citygames.service.impl;

import com.citygames.entity.GameUser;
import com.citygames.repository.GameUserRepository;
import com.citygames.service.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameUserServiceImpl implements GameUserService {

    @Autowired
    private GameUserRepository gameUserRepository;

    @Override
    public GameUser add(GameUser gameUser) {
        return gameUserRepository.saveAndFlush(gameUser);
    }

    @Override
    public void delete(long id) {
        gameUserRepository.delete(id);
    }

    @Override
    public GameUser edit(GameUser gameUser) {
        return gameUserRepository.saveAndFlush(gameUser);
    }

    @Override
    public List<GameUser> getAll() {
        return gameUserRepository.findAll();
    }

    @Override
    public GameUser getByName(String name) {
        return gameUserRepository.findByName(name);
    }

    @Override
    public GameUser getByEmail(String email) { return gameUserRepository.findByEmail(email); }

}
