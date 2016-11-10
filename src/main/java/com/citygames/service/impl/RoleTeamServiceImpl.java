package com.citygames.service.impl;

import com.citygames.entity.RoleTeam;
import com.citygames.repository.RoleTeamRepository;
import com.citygames.service.RoleTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleTeamServiceImpl implements RoleTeamService {

    @Autowired
    private RoleTeamRepository roleTeamRepository;

    @Override
    public RoleTeam add(RoleTeam roleTeam) {
        return roleTeamRepository.saveAndFlush(roleTeam);
    }

    @Override
    public void delete(long id) {
        roleTeamRepository.delete(id);
    }

    @Override
    public RoleTeam edit(RoleTeam roleTeam) {
        return roleTeamRepository.saveAndFlush(roleTeam);
    }

    @Override
    public List<RoleTeam> getAll() {
        return roleTeamRepository.findAll();
    }
}
