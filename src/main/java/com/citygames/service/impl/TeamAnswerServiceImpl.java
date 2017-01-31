package com.citygames.service.impl;

import com.citygames.dto.TeamAnswerDTO;
import com.citygames.entity.*;
import com.citygames.enums.GameTypeEnum;
import com.citygames.repository.AnswerRepository;
import com.citygames.repository.TeamAnswerRepository;
import com.citygames.repository.TeamInGameRepository;
import com.citygames.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class TeamAnswerServiceImpl implements TeamAnswerService {

    @Autowired
    private TeamAnswerRepository teamAnswerRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private SecurityUtilsService securityUtilsService;

    @Autowired
    private GameService gameService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private TeamInGameRepository teamInGameRepository;

    @Autowired
    private TeamQuestionService teamQuestionService;

    @Override
    public TeamAnswer add(TeamAnswerDTO teamAnswerDTO) {
                GameUser gameUser = securityUtilsService.getCurrentUser();

        if(gameService.IsUserApprovedForGame(gameUser, teamAnswerDTO.getGameId())){
            return teamAnswerRepository.saveAndFlush(fillTeamAnswerForGame(gameUser, teamAnswerDTO));
        }

        return new TeamAnswer();
    }

    @Override
    public void delete(long id) {

    }

    @Override
    public TeamAnswer edit(TeamAnswer team) {
        return null;
    }

    @Override
    public List<TeamAnswer> getAllAnswerForTeamAndGame(Long teamId, Long gameId) {
        return null;
    }


    private TeamAnswer fillTeamAnswerForGame(GameUser gameUser, TeamAnswerDTO teamAnswerDTO){
        Game game = gameService.getGameById(teamAnswerDTO.getGameId());
        Team team = teamService.get(gameUser.getTeamId());
        //TeamInGame teamInGame = teamInGameRepository.findByGameIdAndTeamsId(game.getId(), team.getId());
        TeamAnswer teamAnswer =  new TeamAnswer();
        teamAnswer.setAnswer(teamAnswerDTO.getAnswer());
        teamAnswer.setTeam(team);
        teamAnswer.setTime(new Date());
        if ( GameTypeEnum.STORM.getId().equals( game.getTypeGame() ) ) {
            checkAnswerForStormGame(teamAnswer, game);
        } else if (GameTypeEnum.LINER.getId().equals(game.getTypeGame())){
            Question question = questionService.getQuestionForCurrentGameLiner(teamAnswerDTO.getQuestionId());
            checkAnswerForLinerGame(teamAnswer, question, team);
            teamAnswer.setQuestion(question);
        }

        return teamAnswer;
    }

    private void checkAnswerForLinerGame(TeamAnswer teamAnswer, Question question, Team team) {
        for(Answer a : question.getAnswers()){
            List<String> tags = Arrays.asList(a.getAnswerTags().split("  "));
            if(a.getName().equalsIgnoreCase(teamAnswer.getAnswer()) || checkTags(tags, teamAnswer)){
                teamAnswer.setCorrect(true);
                teamAnswer.setAnswerId(a);
                checkIfNextQuestion(a, question, team);
                return;
            }
        }
        teamAnswer.setCorrect(false);

    }

    private boolean checkTags(List<String> tags, TeamAnswer teamAnswer) {
        for (String s : tags){
            if (s.equalsIgnoreCase(teamAnswer.getAnswer())){
                return true;
            }
        }
        return false;
    }

    private void checkIfNextQuestion(Answer a, Question question, Team team) {
        if ((a.getIsCloseQuestion() != null && a.getIsCloseQuestion()) || checkAllAnswers(team, question, a)){
            teamQuestionService.setNextTeamQuestionForLinerGame(question.getGameId());
        }
    }

    private boolean checkAllAnswers(Team team, Question question, Answer a) {
        List<Answer> teamAnswerAnswers = answerRepository.findByTeamIdAndQuestionId(team, question);
        teamAnswerAnswers.add(a);
        Set<Answer> answers = question.getAnswers();
        for(Answer answer : answers){
            if (!teamAnswerAnswers.contains(answer)){
               return false;
            }
        }
        return true;

    }

    private void checkAnswerForStormGame(TeamAnswer teamAnswer, Game game){
        Set<Question> questions = game.getQuestions();
        Question question = null;
        for(Question q : questions){
            for(Answer a : q.getAnswers()){
                if(a.getName().equalsIgnoreCase(teamAnswer.getAnswer())){
                    teamAnswer.setCorrect(true);
                    teamAnswer.setQuestion(q);
                    teamAnswer.setAnswerId(a);
                    return;
                }
            }
            question = q;
        }
        teamAnswer.setCorrect(false);
        teamAnswer.setQuestion(question);
    }
}
