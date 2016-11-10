package com.citygames.service.impl;

import com.citygames.entity.GameUser;
import com.citygames.service.GameUserService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SecurityUtilsServiceImpl implements SecurityUtilsService {

    @Autowired
    private GameUserService gameUserService;

    @Override
    public GameUser getCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        return gameUserService.getByName(name);
    }

}
