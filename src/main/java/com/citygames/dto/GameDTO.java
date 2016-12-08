package com.citygames.dto;

import lombok.Data;

import java.util.Date;

@Data
public class GameDTO {
    private Long id;

    private String name;

    private String description;

    private Date dateStart;

    private Date dateFinish;

    private String image;

    private Long typeGame;

    public GameDTO() {
    }

    public GameDTO(long id, String name, String description, Date dateStart, Date dateFinish, String image){
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.image = image;
    }

    public GameDTO(long id, String name,  Date dateStart, Date dateFinish, Long typeGame){
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.typeGame = typeGame;
    }
}
