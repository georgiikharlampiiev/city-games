package com.citygames.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@ToString(exclude = "password")
@Entity
public class GameUser {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private @Id @GeneratedValue Long id;

    private String name;

    private @JsonIgnore
    String password;

    @ManyToOne
    private UserRole role;

    @ManyToOne
    private RoleTeam roleTeam;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public String [] getRoles() {
        List<String> listForReturn = new ArrayList<>();
        listForReturn.add("user");
        listForReturn.add("manager");
        return listForReturn.toArray(new String[2]);
    }
}