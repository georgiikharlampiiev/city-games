package com.citygames.service.impl;

import com.citygames.dto.GameDTO;
import com.citygames.entity.*;
import com.citygames.enums.RoleEnum;
import com.citygames.repository.*;
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
import java.util.stream.Collector;
import java.util.stream.Collectors;

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

    @Autowired
    private TypeGameRepository typeGameRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Game add(Game game) {
        GameUser gameUser = securityUtilsService.getCurrentUser();
        if (isUserGameEditor(gameUser, game.getId())) {
            Game previousGame = game.getId() != null ? gameRepository.findOne(game.getId()) : new Game();

            previousGame.setImage(game.getImage());
            previousGame.setName(game.getName());
            previousGame.setDescription(game.getDescription());
            previousGame.setDateStart(game.getDateStart());
            previousGame.setDateFinish(game.getDateFinish());
            previousGame.setGameAdmins(game.getGameAdmins());
            previousGame.setTypeGame(game.getTypeGame());

            if (previousGame.getGameAdmins() != null) {
                GameAdmin admin = new GameAdmin();
                admin.setGame(previousGame);
                admin.setGameUser(gameUser);
                previousGame.getGameAdmins().add(admin);
            } else {
                Set<GameAdmin> admins = new HashSet<>();
                GameAdmin admin = new GameAdmin();
                admin.setGame(previousGame);
                admin.setGameUser(gameUser);
                admins.add(admin);
                previousGame.setGameAdmins(admins);
            }

            Game newGame = gameRepository.save(previousGame);

            if ( game.getQuestions() != null && !game.getQuestions().isEmpty() ) {

                Set<Answer> previousAnswers = new HashSet<>();

                if(previousGame.getQuestions() == null){
                    previousGame.setQuestions(new HashSet<>());
                }

                previousGame.getQuestions().stream().forEach(q -> {
                    previousAnswers.addAll(q.getAnswers());
                });

                answerRepository.delete(previousAnswers);

                if( previousGame.getQuestions() != null && !previousGame.getQuestions().isEmpty()
                        && previousGame.getQuestions().size() > game.getQuestions().size() ){
                    Set<Question> forDelete = previousGame.getQuestions();
                    forDelete.removeAll(game.getQuestions());
                    questionRepository.delete(forDelete);
                    previousGame.setQuestions(game.getQuestions());
                }else{
                    previousGame.setQuestions(game.getQuestions());
                }
                previousGame.getQuestions().stream().forEach(q -> q.setGameId(newGame.getId()));
                List<Question> savedQuestions = questionRepository.save(previousGame.getQuestions());

                Set<Answer> answers = new HashSet<>();
                savedQuestions.stream().forEach(q -> {
                    q.getAnswers().forEach( answer -> answer.setQuestionId(q.getId()));
                    answers.addAll(q.getAnswers());
                });

                answerRepository.save(answers);

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
    public List<TypeGame> getAllGameTypes(){
        return typeGameRepository.findAll();
    }

    @Override
    public Game getGameById(Long id) {
        return gameRepository.findOne(id);
    }

    @Override
    public GameDTO getGameForPlay(Long gameId) {
        TypedQuery query = em.createQuery("select NEW com.citygames.dto.GameDTO(g.id, g.name, g.dateStart, g.dateFinish, g.typeGame) from Game g WHERE g.id = :gameId", GameDTO.class);

        return (GameDTO)query.setParameter("gameId", gameId).getSingleResult();
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
        return this.IsUserApprovedForGame(user, gameId);
    }

    @Override
    public Boolean IsUserApprovedForGame(GameUser user, Long gameId) {
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

        return this.isUserGameEditor(user, gameId);
    }

    @Override
    public Boolean isUserGameEditor(GameUser user, Long gameId) {

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
