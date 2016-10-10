package com.citygames.service;

import com.citygames.entity.GameAdmin;
import java.util.List;

public interface GameAdminService {

    GameAdmin add(GameAdmin gameAdmin);

    void delete(long id);

    GameAdmin edit(GameAdmin gameAdmin);

    List<GameAdmin> getAll();

}
