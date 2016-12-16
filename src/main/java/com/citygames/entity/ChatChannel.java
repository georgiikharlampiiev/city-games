package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class ChatChannel {

  private @Id @GeneratedValue Long id;

  private String channelName;

}
