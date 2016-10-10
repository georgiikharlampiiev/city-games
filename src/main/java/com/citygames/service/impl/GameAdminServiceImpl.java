package com.citygames.service.impl;

import com.citygames.entity.GameAdmin;
import com.citygames.repository.GameAdminRepository;
import com.citygames.service.GameAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameAdminServiceImpl implements GameAdminService {

    @Autowired
    private GameAdminRepository gameAdminRepository;

    public GameAdmin add(GameAdmin gameAdmin) {
        return gameAdminRepository.saveAndFlush(gameAdmin);
    }

    public void delete(long id) {
        gameAdminRepository.delete(id);
    }

    public GameAdmin edit(GameAdmin gameAdmin) {
        return gameAdminRepository.saveAndFlush(gameAdmin);
    }

    public List<GameAdmin> getAll() {
        return gameAdminRepository.findAll();
    }
}
