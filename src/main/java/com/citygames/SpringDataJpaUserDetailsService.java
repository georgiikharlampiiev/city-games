package com.citygames;

import com.citygames.entity.GameUser;
import com.citygames.repository.GameUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final GameUserRepository repository;

	@Autowired
	public SpringDataJpaUserDetailsService(GameUserRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		GameUser gameUser = this.repository.findByName(name);
		return new User(gameUser.getName(), gameUser.getPassword(),
				AuthorityUtils.createAuthorityList(gameUser.getRoles()));
	}

}

