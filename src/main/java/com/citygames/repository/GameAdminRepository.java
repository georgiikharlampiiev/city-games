package com.citygames.repository;

import com.citygames.entity.GameAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameAdminRepository extends JpaRepository<GameAdmin, Long> {
}

