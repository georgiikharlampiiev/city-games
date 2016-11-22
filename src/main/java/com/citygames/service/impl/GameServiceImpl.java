package com.citygames.service.impl;

import com.citygames.entity.Game;
import com.citygames.entity.GameUser;
import com.citygames.entity.Team;
import com.citygames.enums.RoleEnum;
import com.citygames.repository.GameRepository;
import com.citygames.repository.QuestionRepository;
import com.citygames.repository.TeamRepository;
import com.citygames.service.GameService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GameServiceImpl implements GameService {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private SecurityUtilsService securityUtilsService;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Game add(Game game) {
        if (isUserGameEditor(game.getId())) {
            if (game.getGameAdmins() != null) {
                game.getGameAdmins().add(securityUtilsService.getCurrentUser());
            } else {
                Set<GameUser> admins = new HashSet<>();
                admins.add(securityUtilsService.getCurrentUser());
                game.setGameAdmins(admins);
            }

            if (game.getQuestions() != null && !game.getQuestions().isEmpty())
                questionRepository.save(game.getQuestions());


            return gameRepository.save(game);
        } else return game;
    }

    @Override
    public void delete(long id) {
        gameRepository.delete(id);
    }

    @Override
    public Game edit(Game game) {
        return gameRepository.saveAndFlush(game);
    }

    @Override
    public List<Game> getAll() {
        return gameRepository.findAll();
    }

    @Override
    public List<Game> getAllGames(int page, int pageSize) {
        TypedQuery query = em.createQuery("select g from Game g ORDER BY DATE(dateStart) ASC", Game.class);

        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }

    @Override
    public List<Game> getAllActiveGames(int page, int pageSize) {
        TypedQuery query = em.createQuery("select g from Game g WHERE dateFinish >= CURDATE() ORDER BY DATE(dateStart) ASC", Game.class);

        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }

    @Override
    public List<Game> getAllDisableGames(int page, int pageSize) {

        TypedQuery query = em.createQuery("select g from Game g  WHERE dateFinish < CURDATE() ORDER BY DATE(dateFinish)", Game.class);

        query.setFirstResult(page * pageSize);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }

    @Override
    public Game getGameById(Long id) {
        return gameRepository.findOne(id);
    }

    @Override
    public Boolean addApplyGameByCurrentUser(Long gameId) {
        GameUser user = securityUtilsService.getCurrentUser();
        if (user != null && user.getTeamId() != null) {

            Game game = gameRepository.findOne(gameId);
            Team team = teamRepository.findOne(user.getTeamId());

            if (team != null) {
                game.getTeams().add(team);
                this.edit(game);
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean deleteApplyGameByCurrentUser(Long gameId) {
        GameUser user = securityUtilsService.getCurrentUser();
        if (user != null && user.getTeamId() != null) {

            Game game = gameRepository.findOne(gameId);
            Team team = teamRepository.findOne(user.getTeamId());

            if (team != null) {
                Set<Team> teams = game.getTeams();
                game.setTeams(teams.stream()
                        .filter(t -> !t.getId().equals(user.getTeamId()))
                        .collect(Collectors.toSet()));
                this.edit(game);
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean IsUserAppliedGame(Long gameId) {
        GameUser user = securityUtilsService.getCurrentUser();
        if (user != null && user.getTeamId() != null) {
            Game game = gameRepository.findOne(gameId);
            return !game.getTeams().stream()
                    .filter(team -> team.getId().equals(user.getTeamId()))
                    .collect(Collectors.toList())
                    .isEmpty();
        }
        return false;
    }

    @Override
    public Boolean isUserGameEditor(Long gameId) {
        GameUser user = securityUtilsService.getCurrentUser();

        if (user != null && user.getRoleId() != null) {

            if (RoleEnum.ADMIN.getId().equals(user.getRoleId().getId())) {
                return true;
            }

            Game game = gameRepository.findOne(gameId);
            if (game != null) {
                return game.getGameAdmins()
                        .stream()
                        .anyMatch(a -> user.getId().equals(a.getId()));
            }
        }
        return false;
    }

}
