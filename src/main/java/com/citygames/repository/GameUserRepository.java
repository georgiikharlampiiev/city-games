package com.citygames.repository;

import com.citygames.entity.GameUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GameUserRepository extends JpaRepository<GameUser, Long> {

    @Query("from GameUser g where g.name = :name")
    GameUser findByName(@Param("name") String name);
}

