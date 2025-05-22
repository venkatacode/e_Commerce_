package com.infy.verizon.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartDTO {
	
	private Integer cartId;
	@NotNull(message="{QUANTITY_NOT_NULL}")
	@NotBlank(message="{QUANTITY_NOT_NULL}")
	@Min(value=1,message= "{MINUMUM_QUANTITY_REQUIRED}")
	private Integer quantity;
	private UserDTO userDTO;
	private MobileDTO mobileDTO;

}
