package com.citygames.repository;

import com.citygames.entity.TeamAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(exported = false)
public interface TeamAnswerRepository extends JpaRepository<TeamAnswer, Long> {
}

