package com.citygames.service;


import com.citygames.entity.Team;
import java.util.List;

public interface TeamService {

    Team add(Team team);

    void delete(long id);

    Team edit(Team team);

    List<Team> getAll();

}
