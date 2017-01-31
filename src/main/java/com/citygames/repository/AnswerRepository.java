package com.citygames.repository;

import com.citygames.entity.Answer;
import com.citygames.entity.Question;
import com.citygames.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("select ta.answerId from TeamAnswer ta where ta.team = :teamId and ta.question in (:questionId) group by ta.answerId")
    List<Answer> findByTeamIdAndQuestionId(@Param("teamId") Team teamId, @Param("questionId") Question questionId);
}

