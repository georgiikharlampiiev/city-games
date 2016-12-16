package com.citygames.service;


import com.citygames.entity.ChatChannel;

public interface ChatChannelService {

    ChatChannel add(ChatChannel chatChannel);

    void delete(long id);

    ChatChannel edit(ChatChannel chatChannel);

}
