package com.citygames.enums;

import com.citygames.entity.RoleTeam;
import lombok.Getter;

public enum RoleTeamEnum {

    ADMIN(1l, "ADMIN"),
    PLAYER(2l, "PLAYER"),
    APPLICANT(3l, "APPLICANT");

    @Getter Long id;
    @Getter String name;

    RoleTeamEnum(Long id, String name){
        this.id = id;
        this.name = name;
    }

    public RoleTeam getRoleTeam(){
        RoleTeam roleTeam = new RoleTeam();
        roleTeam.setId(this.id);
        roleTeam.setName(this.name);
        return roleTeam;
    }

    public static RoleTeamEnum getById(Long id) {
        for(RoleTeamEnum e : values()) {
            if(e.id.equals(id)) return e;
        }
        return null;
    }
}
