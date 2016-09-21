package com.citygames.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class RoleTeam {

    private @Id @GeneratedValue Long id;

    private String teamRole;
}
