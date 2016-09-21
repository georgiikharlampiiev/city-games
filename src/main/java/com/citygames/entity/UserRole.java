package com.citygames.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class UserRole {

    private @Id @GeneratedValue Long id;

    private String role;
}
