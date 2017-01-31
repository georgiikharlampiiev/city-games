package com.citygames.repository;

import com.citygames.entity.TeamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamQuestionRepository extends JpaRepository<TeamQuestion, Long> {

    TeamQuestion findByGameTeamId(Long game_team_id);

}

