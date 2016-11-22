package com.citygames.service.impl;

import com.citygames.entity.Question;
import com.citygames.repository.QuestionRepository;
import com.citygames.service.QuestionService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SecurityUtilsService securityUtilsService;

    @Override
    public List<Question> getQuestionsForCurrentGame(Long id){
        TypedQuery query = em.createQuery("SELECT q FROM Question q WHERE q.gameId = :gameId ORDER BY q.orderInGame ASC", Question.class);

        query.setParameter("gameId", id);

        return query.getResultList();
    }

}
