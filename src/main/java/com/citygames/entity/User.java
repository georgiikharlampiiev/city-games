package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class User {

    private @Id @GeneratedValue Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "id")
    private UserRole userRole;
}
