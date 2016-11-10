package com.citygames.enums;

import lombok.Getter;

public enum RoleEnum {

    ADMIN(1l, "Admin"),
    USER(2l, "User");

    @Getter Long id;
    @Getter String name;

    RoleEnum(Long id, String name){
        this.id = id;
        this.name = name;
    }

}
