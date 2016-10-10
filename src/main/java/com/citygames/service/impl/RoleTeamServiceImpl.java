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

    public RoleTeam add(RoleTeam roleTeam) {
        return roleTeamRepository.saveAndFlush(roleTeam);
    }

    public void delete(long id) {
        roleTeamRepository.delete(id);
    }

    public RoleTeam edit(RoleTeam roleTeam) {
        return roleTeamRepository.saveAndFlush(roleTeam);
    }

    public List<RoleTeam> getAll() {
        return roleTeamRepository.findAll();
    }
}
