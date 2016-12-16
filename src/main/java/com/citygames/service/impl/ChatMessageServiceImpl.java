package com.citygames.service.impl;

import com.citygames.entity.ChatMessage;
import com.citygames.repository.ChatMessageRepository;
import com.citygames.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Override
    public ChatMessage add(ChatMessage chatMessage) {
        return chatMessageRepository.saveAndFlush(chatMessage);
    }

    @Override
    public void delete(long id) {
        chatMessageRepository.delete(id);
    }

    @Override
    public ChatMessage edit(ChatMessage chatMessage) {
        return chatMessageRepository.saveAndFlush(chatMessage);
    }

}
