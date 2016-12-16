package com.citygames.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class ChatMessage {


    @Id
    @GeneratedValue
    private Long id;

    private String text;

    private Date time;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id")
    private Long channelId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id")
    private Long gameUserId;

}
