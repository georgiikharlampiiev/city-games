package com.citygames.enums;

import lombok.Getter;

public enum GameTypeEnum {

    STORM(0l, "Storm", "storm"),
    LINER(1l, "Liner", "liner"),
    PUB_QUIZ(2l, "Pub-quiz", "pub-quiz");

    @Getter Long id;
    @Getter String name;
    @Getter String code;

    GameTypeEnum(Long id, String name, String code){
        this.id = id;
        this.name = name;
        this.code = code;
    }

}
