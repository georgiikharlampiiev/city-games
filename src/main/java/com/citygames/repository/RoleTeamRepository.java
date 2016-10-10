package com.citygames.repository;

import com.citygames.entity.RoleTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleTeamRepository extends JpaRepository<RoleTeam, Long> {
}

