package com.citygames;

import com.citygames.entity.GameUser;
import com.citygames.repository.GameUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(GameUser.class)
public class SpringDataRestEventHandler {

	private final GameUserRepository managerRepository;

	@Autowired
	public SpringDataRestEventHandler(GameUserRepository managerRepository) {
		this.managerRepository = managerRepository;
	}

	@HandleBeforeCreate
	public void applyUserInformationUsingSecurityContext(GameUser employee) {

		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		GameUser manager = this.managerRepository.findByName(name);
//		if (manager == null) {
//			Manager newManager = new Manager();
//			newManager.setName(name);
//			newManager.setRoles(new String[]{"ROLE_MANAGER"});
//			manager = this.managerRepository.save(newManager);
//		}
//		employee.setManager(manager);
	}
}

