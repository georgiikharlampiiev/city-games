package com.citygames.service.impl;

import com.citygames.entity.UserRole;
import com.citygames.repository.UserRoleRepository;
import com.citygames.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public UserRole add(UserRole team) {
        return userRoleRepository.saveAndFlush(team);
    }

    @Override
    public void delete(long id) {
        userRoleRepository.delete(id);
    }

    @Override
    public UserRole edit(UserRole team) {
        return userRoleRepository.saveAndFlush(team);
    }

    @Override
    public List<UserRole> getAll() {
        return userRoleRepository.findAll();
    }
}
