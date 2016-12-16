package com.citygames.service;


import com.citygames.entity.ChatMessage;

import java.util.List;

public interface ChatMessageService {

    ChatMessage add(ChatMessage chatMessage);

    void delete(long id);

    ChatMessage edit(ChatMessage chatMessage);

}
