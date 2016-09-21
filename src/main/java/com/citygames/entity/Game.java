package com.citygames.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Game {

    private @Id @GeneratedValue Long id;

    private String name;

    private String description;

    private Date dateStart;

    private Date dateFinish;
}
