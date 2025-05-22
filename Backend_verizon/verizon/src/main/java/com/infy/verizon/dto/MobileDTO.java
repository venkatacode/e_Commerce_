package com.infy.verizon.dto;

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
public class MobileDTO {

	private Integer mobileId;
	@NotBlank(message = "{BRAND_NOT_NULL}")
	private String brand;
	@NotBlank(message = "{MODEL_NOT_NULL}")
	private String model;
	@NotNull(message = "{PRICE_NOT_NULL}")
	private Double price;
	@NotBlank(message = "{DISPLAY_SIZE_REQUIRED}")
	private String displaySize;
	@NotBlank(message = "{PROCESSOR_REQUIRED}")
	private String processor;
	@NotBlank(message = "{RAM_REQUIRED}")
	private String ram;
	@NotBlank(message = "{STORAGE_REQUIRED}")
	private String storage;
	@NotBlank(message = "{CAMERA_REQUIRED}")
	private String camera;
	@NotBlank(message = "{BATTERY_REQUIRED}")
	private String battery;
	@NotBlank(message = "{IMAGEURL_REQUIRED}")
	private String imageUrl;
	@NotBlank(message = "{COLOR_REQUIRED}")
	private String color;

}
