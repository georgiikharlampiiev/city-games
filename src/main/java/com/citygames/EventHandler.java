package com.citygames;

//import static com.citygames.WebSocketConfiguration.*;
//
//import com.citygames.entity.GameUser;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.rest.core.annotation.HandleAfterCreate;
//import org.springframework.data.rest.core.annotation.HandleAfterDelete;
//import org.springframework.data.rest.core.annotation.HandleAfterSave;
//import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
//import org.springframework.hateoas.EntityLinks;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Component;

//@Component
//@RepositoryEventHandler(GameUser.class)
public class EventHandler {

//	private final SimpMessagingTemplate websocket;
//
//	private final EntityLinks entityLinks;
//
//	@Autowired
//	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
//		this.websocket = websocket;
//		this.entityLinks = entityLinks;
//	}
//
//	@HandleAfterCreate
//	public void newEmployee(GameUser employee) {
//		this.websocket.convertAndSend(
//				MESSAGE_PREFIX + "/newEmployee", getPath(employee));
//	}
//
//	@HandleAfterDelete
//	public void deleteEmployee(GameUser employee) {
//		this.websocket.convertAndSend(
//				MESSAGE_PREFIX + "/deleteEmployee", getPath(employee));
//	}
//
//	@HandleAfterSave
//	public void updateEmployee(GameUser employee) {
//		this.websocket.convertAndSend(
//				MESSAGE_PREFIX + "/updateEmployee", getPath(employee));
//	}
//
//	/**
//	 * Take an {@link GameUser} and get the URI using Spring Data REST's {@link EntityLinks}.
//	 *
//	 * @param employee
//	 */
//	private String getPath(GameUser employee) {
//		return this.entityLinks.linkForSingleResource(employee.getClass(),
//				employee.getId()).toUri().getPath();
//	}
//
}

