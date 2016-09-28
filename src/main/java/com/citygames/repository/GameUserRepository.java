package com.citygames.repository;

import com.citygames.entity.GameUser;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface GameUserRepository extends Repository<GameUser, Long> {

	GameUser save(GameUser manager);

	GameUser findByName(String name);

}

