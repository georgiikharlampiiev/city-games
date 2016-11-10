package com.citygames;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Date;
import java.text.SimpleDateFormat;


@Configuration
@EnableScheduling
public class SchedulLog {


    private static final Logger log = LoggerFactory.getLogger(SchedulLog.class);

    private static final SimpleDateFormat date = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(fixedDelay=30000)
    public void printMessage() {
        log.info("The time is now {}", date.format(new Date(1)));

        //System.out.println("Maybe not the end yet" + System.currentTimeMillis()/30000);
    }




}
