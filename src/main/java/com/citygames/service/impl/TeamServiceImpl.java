package com.citygames.service.impl;

import com.citygames.entity.Team;
import com.citygames.repository.TeamRepository;
import com.citygames.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public Team add(Team team) {
        return teamRepository.saveAndFlush(team);
    }

    @Override
    public void delete(long id) {
        teamRepository.delete(id);
    }

    @Override
    public Team edit(Team team) {
        return teamRepository.saveAndFlush(team);
    }

    @Override
    public List<Team> getAll() {
        return teamRepository.findAll();
    }
}
