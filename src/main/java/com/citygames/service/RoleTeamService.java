package com.citygames.service;

import com.citygames.entity.RoleTeam;
import java.util.List;

public interface RoleTeamService {

    RoleTeam add(RoleTeam roleTeam);

    void delete(long id);

    RoleTeam edit(RoleTeam roleTeam);

    List<RoleTeam> getAll();

}
