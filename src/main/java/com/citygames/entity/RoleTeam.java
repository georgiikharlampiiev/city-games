package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class RoleTeam {

    private @Id @GeneratedValue Long id;

    private String role;

}
