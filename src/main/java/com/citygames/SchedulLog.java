package com.citygames;


import com.citygames.entity.Game;
import com.citygames.service.GameService;
import com.citygames.service.impl.GameServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@EnableScheduling
public class SchedulLog {
    @Autowired
    GameService gameService;

    public static final Logger log = LoggerFactory.getLogger(SchedulLog.class);


    @Scheduled(cron = "0 */2 * * * *")
    public void cronDisableGames() {

        log.info("Games that ended at the moment " + gameService.getAllDisableGames(0, 10));
    }
}
