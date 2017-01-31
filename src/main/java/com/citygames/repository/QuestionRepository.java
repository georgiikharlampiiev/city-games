package com.citygames.repository;

import com.citygames.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByGameIdOrderByOrderInGameAsc(Long gameId);

    Question findByGameIdAndOrderInGame(Long gameId, Integer orderInGame);

}

