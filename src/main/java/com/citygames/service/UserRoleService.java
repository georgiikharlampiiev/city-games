package com.citygames.service;


import com.citygames.entity.UserRole;
import java.util.List;

public interface UserRoleService {

    UserRole add(UserRole userRole);

    void delete(long id);

    UserRole edit(UserRole userRole);

    List<UserRole> getAll();

}
