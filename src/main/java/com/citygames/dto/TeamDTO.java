package com.citygames.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TeamDTO {
    private Long id;

    private String name;

    private Boolean approved;

    public TeamDTO() {
    }

    public TeamDTO(Long id, String name, Boolean approved){
        this.id = id;
        this.name = name;
        this.approved = approved;
    }
}
