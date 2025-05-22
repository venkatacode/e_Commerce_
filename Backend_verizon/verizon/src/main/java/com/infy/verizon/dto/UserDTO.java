package com.infy.verizon.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {

	private Integer userId;
	@NotBlank(message = "{USER_NAME_NOT_NULL}")
	private String userName;
	@NotBlank(message = "{EMAIL_NOT_NULL}")
	@Email(message = "{VALID_EMAIL}")
	private String userEmail;
	@NotNull(message = "{PASSWORD_REQUIRED}")
	@Size(min = 8, message = "VALID_PASSWORD")
	private String password;
	private String fullName;
	private String address;
	private String city;
	private String state;
	private String country;
	private Integer pincode;
	@NotNull(message = "{PHONENUM_NOT_NULL}")
	private Long phoneNo;
	private String dfo;

}
