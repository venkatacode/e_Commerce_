package com.infy.verizon.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDTO {

	private Integer orderId;
	@NotBlank(message="{PRICE_NOT_NULL}")
	private Double totalPrice;
	@NotBlank(message="{ORDER_DATE_NOT_NULL}")
	@Future(message="{VALID_DATE}")
	private LocalDate orderDate;
	@NotBlank(message="{ADDRESS_NOT_NULL}")
	private String address;
	@NotBlank(message="{CITY_NOT_NULL}")
	private String city;
	@NotBlank(message="STATE_NOT_NULL")
	private String state;
	@NotBlank(message="COUNTRY_NOT_NULL")
	private String country;
	@NotBlank(message="PINCODE_NOT_NULL")
	private Integer pincode;
	private UserDTO userDTO;
	private MobileDTO mobileDTO;
}
