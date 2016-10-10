package com.citygames.service;

import com.citygames.entity.GameUser;
import java.util.List;

public interface GameUserService {

    GameUser add(GameUser gameUser);

    void delete(long id);

    GameUser edit(GameUser gameUser);

    List<GameUser> getAll();

    GameUser getByName(String name);

}
