package com.infy.verizon.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Mobile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer mobileId;
	private String brand;
	private String model;
	private Double price;
	private String displaySize;
	private String processor;
	private String ram;
	private String storage;
	private String camera;
	private String battery;
	private String imageUrl;
	private String color;

}
