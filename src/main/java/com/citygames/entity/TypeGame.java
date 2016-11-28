package com.citygames.entity;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "type_game")
public class TypeGame {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "type")
    private String type;


}
