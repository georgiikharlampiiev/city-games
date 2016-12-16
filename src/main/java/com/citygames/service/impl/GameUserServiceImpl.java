package com.citygames.service.impl;

import com.citygames.dto.TeamDTO;
import com.citygames.entity.GameUser;
import com.citygames.entity.Team;
import com.citygames.repository.GameUserRepository;
import com.citygames.repository.TeamRepository;
import com.citygames.service.GameUserService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameUserServiceImpl implements GameUserService {

    @Autowired
    private GameUserRepository gameUserRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private SecurityUtilsService securityUtilsService;

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
    public TeamDTO getUserTeam(GameUser currentUser) {
        if(currentUser == null){
            currentUser = securityUtilsService.getCurrentUser();
        }
        Long teamId = currentUser.getTeamId();
        if (teamId != null){
            return new TeamDTO(teamRepository.findOne(teamId));
        }
        return null;
    }

    @Override
    public GameUser getByEmail(String email) { return gameUserRepository.findByEmail(email); }

}
