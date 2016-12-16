package com.citygames.service;

import com.citygames.dto.TeamDTO;
import com.citygames.entity.GameUser;
import com.citygames.entity.Team;

import java.util.List;

public interface GameUserService {

    GameUser add(GameUser gameUser);

    void delete(long id);

    GameUser edit(GameUser gameUser);

    List<GameUser> getAll();

    GameUser getByName(String name);

    TeamDTO getUserTeam(GameUser gameUser);

    GameUser getByEmail(String email);

}
