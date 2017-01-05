package com.citygames.service.impl;

import com.citygames.dto.TeamAnswerDTO;
import com.citygames.entity.*;
import com.citygames.enums.GameTypeEnum;
import com.citygames.repository.TeamAnswerRepository;
import com.citygames.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class TeamAnswerServiceImpl implements TeamAnswerService {

    @Autowired
    private TeamAnswerRepository teamAnswerRepository;

    @Autowired
    private SecurityUtilsService securityUtilsService;

    @Autowired
    private GameService gameService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private QuestionService questionService;

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
        TeamAnswer teamAnswer =  new TeamAnswer();
        teamAnswer.setAnswer(teamAnswerDTO.getAnswer());
        teamAnswer.setTeam(team);
        teamAnswer.setTime(new Date());
        if ( GameTypeEnum.STORM.getId().equals( game.getTypeGame() ) ) {
            checkAnswerForStormGame(teamAnswer, game);
        } else if (GameTypeEnum.LINER.getId().equals(game.getTypeGame())){
            Question question = questionService.getQuestionById(teamAnswerDTO.getQuestionId());
            checkAnswerForLinerGame(teamAnswer, question);
            teamAnswer.setQuestion(question);
        }

        return teamAnswer;
    }

    private void checkAnswerForLinerGame(TeamAnswer teamAnswer, Question question) {
        for(Answer a : question.getAnswers()){
            if(a.getName().equalsIgnoreCase(teamAnswer.getAnswer())){
                teamAnswer.setCorrect(true);
                return;
            }
        }
        teamAnswer.setCorrect(false);

    }

    private void checkAnswerForStormGame(TeamAnswer teamAnswer, Game game){
        Set<Question> questions = game.getQuestions();
        Question question = null;
        for(Question q : questions){
            for(Answer a : q.getAnswers()){
                if(a.getName().equalsIgnoreCase(teamAnswer.getAnswer())){
                    teamAnswer.setCorrect(true);
                    teamAnswer.setQuestion(q);
                    return;
                }
            }
            question = q;
        }
        teamAnswer.setCorrect(false);
        teamAnswer.setQuestion(question);
    }
}
