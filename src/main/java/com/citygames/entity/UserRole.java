package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class UserRole {

    private @Id @GeneratedValue Long id;

    private String role;

}
