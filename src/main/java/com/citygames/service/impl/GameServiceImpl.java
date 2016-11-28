package com.citygames.service.impl;

import com.citygames.dto.GameDTO;
import com.citygames.entity.*;
import com.citygames.enums.RoleEnum;
import com.citygames.repository.GameRepository;
import com.citygames.repository.QuestionRepository;
import com.citygames.repository.TeamInGameRepository;
import com.citygames.repository.TeamRepository;
import com.citygames.service.GameService;
import com.citygames.service.SecurityUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
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

    @Autowired
    private TeamInGameRepository teamInGameRepository;

    @Override
    public Game add(Game game) {
        if (isUserGameEditor(game.getId())) {
            Game priviesGame = game.getId() != null ? gameRepository.findOne(game.getId()) : new Game();

            priviesGame.setImage(game.getImage());
            priviesGame.setName(game.getName());
            priviesGame.setDescription(game.getDescription());
            priviesGame.setDateStart(game.getDateStart());
            priviesGame.setDateFinish(game.getDateFinish());
            priviesGame.setGameAdmins(game.getGameAdmins());

            if (priviesGame.getGameAdmins() != null) {
                GameAdmin admin = new GameAdmin();
                admin.setGame(priviesGame);
                admin.setGameUser(securityUtilsService.getCurrentUser());
                priviesGame.getGameAdmins().add(admin);
            } else {
                Set<GameAdmin> admins = new HashSet<>();
                GameAdmin admin = new GameAdmin();
                admin.setGame(priviesGame);
                admin.setGameUser(securityUtilsService.getCurrentUser());
                admins.add(admin);
                priviesGame.setGameAdmins(admins);
            }

            Game newGame = gameRepository.save(priviesGame);

            if ( game.getQuestions() != null && !game.getQuestions().isEmpty() ) {
                if( priviesGame.getQuestions() != null && !priviesGame.getQuestions().isEmpty()
                        && priviesGame.getQuestions().size() > game.getQuestions().size() ){
                    Set<Question> forDelete = priviesGame.getQuestions();
                    forDelete.removeAll(game.getQuestions());
                    questionRepository.delete(forDelete);
                    priviesGame.setQuestions(game.getQuestions());
                }else{
                    priviesGame.setQuestions(game.getQuestions());
                }
                priviesGame.getQuestions().stream().forEach(q -> q.setGameId(newGame.getId()));
                questionRepository.save(priviesGame.getQuestions());
            }

            return newGame;
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
    public List<GameDTO> getAllActiveGames(int page, int pageSize) {
        TypedQuery query = em.createQuery("select NEW com.citygames.dto.GameDTO(g.id, g.name, g.description, g.dateStart, g.dateFinish, g.image) from Game g WHERE dateFinish >= CURDATE() ORDER BY DATE(dateStart) ASC", GameDTO.class);

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
                TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(game.getId(), team.getId());
                if(teamInGame == null) {
                    teamInGame = new TeamInGame();
                    teamInGame.setGame(game);
                    teamInGame.setTeams(team);
                    teamInGame.setApproved(false);
                }
                teamInGame.setDeleted(false);
                teamInGameRepository.save(teamInGame);
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
                TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(game.getId(), team.getId());
                teamInGame.setDeleted(true);
                teamInGameRepository.save(teamInGame);
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
            Team team = teamRepository.findOne(user.getTeamId());
            TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(game.getId(), team.getId());
            return teamInGame != null && !teamInGame.isDeleted();
        }
        return false;
    }

    @Override
    public Boolean IsUserApprovedForGame(Long gameId) {
        GameUser user = securityUtilsService.getCurrentUser();
        if (user != null && user.getTeamId() != null) {
            Game game = gameRepository.findOne(gameId);
            Team team = teamRepository.findOne(user.getTeamId());
            TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(game.getId(), team.getId());
            return teamInGame != null && !teamInGame.isDeleted() && teamInGame.isApproved();
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
                        .anyMatch(a -> user.getId().equals(a.getGameUser().getId()));
            }
        }
        return false;
    }

}
