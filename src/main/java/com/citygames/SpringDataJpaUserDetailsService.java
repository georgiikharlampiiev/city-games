package com.citygames;

import com.citygames.entity.GameUser;
import com.citygames.service.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

    private final GameUserService gameUserService;

    @Autowired
    public SpringDataJpaUserDetailsService(GameUserService gameUserService) {
        this.gameUserService = gameUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        GameUser gameUser = this.gameUserService.getByName(name);
        return new User(gameUser.getName(), gameUser.getPassword(),
                AuthorityUtils.createAuthorityList(gameUser.getRoles()));
    }

}

