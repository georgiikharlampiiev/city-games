package com.citygames.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;


@Data
@Entity
public class File {

  private @Id
  @GeneratedValue
  Long id;

  private String name;

  @Lob
  private byte[] data;

}
