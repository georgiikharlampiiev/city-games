package com.citygames.repository;

import com.citygames.entity.CurrentQuestion;
import com.citygames.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrentQuestionRepository extends JpaRepository<CurrentQuestion, Long> {

    CurrentQuestion findByGameTeamId(Long game_team_id);

}

