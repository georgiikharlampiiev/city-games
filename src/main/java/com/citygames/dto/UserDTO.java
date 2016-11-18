package com.citygames.dto;

import lombok.Data;

import javax.persistence.*;

@Data
public class UserDTO {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String email;

    private String password;

}
