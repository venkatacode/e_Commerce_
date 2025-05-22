package com.infy.verizon.controller;

import java.util.List;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.infy.verizon.dto.CartDTO;
import com.infy.verizon.dto.CartRequest;
import com.infy.verizon.dto.MobileDTO;
import com.infy.verizon.entity.Mobile;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.service.CartService;
import com.infy.verizon.service.MobileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/verizon")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class ControllerClass {

	private MobileService mobileService;

	private CartService cartService;

	private Environment environment;

	public ControllerClass(Environment environment, MobileService mobileService, CartService cartService) {
		this.environment = environment;
		this.mobileService = mobileService;
		this.cartService = cartService;
	}

	@PostMapping
	public ResponseEntity<MobileDTO> addMobiles(@RequestBody @Valid MobileDTO mobilesDTO) throws EcommerceException {
		MobileDTO mobileDTO = mobileService.addmobiles(mobilesDTO);
		return new ResponseEntity<>(mobileDTO, HttpStatus.OK);
	}

	@GetMapping("/mobiles")
	public ResponseEntity<List<Mobile>> getallmobiles(Mobile mobile) throws EcommerceException {
		List<Mobile> mobilesList = mobileService.getallmobiles(mobile);
		return new ResponseEntity<>(mobilesList, HttpStatus.OK);
	}

	@GetMapping("mobile/{mobileId}")
	public ResponseEntity<List<MobileDTO>> getmobileById(@PathVariable Integer mobileId, Mobile mobile)
			throws EcommerceException {
		List<MobileDTO> mobiles = mobileService.getmobilebyId(mobile.getMobileId(), mobile);
		return new ResponseEntity<>(mobiles, HttpStatus.OK);
	}

	@GetMapping("brand/{brand}")
	public ResponseEntity<List<MobileDTO>> getmobileBybrand(@PathVariable String brand) throws EcommerceException {
		List<MobileDTO> mobiles = mobileService.getmobileBybrand(brand);
		return new ResponseEntity<>(mobiles, HttpStatus.OK);
	}

	@GetMapping("color/{color}")
	public ResponseEntity<List<MobileDTO>> getmobileBycolor(@PathVariable String color) throws EcommerceException {
		List<MobileDTO> mobiles = mobileService.getmobileBycolor(color);
		return new ResponseEntity<>(mobiles, HttpStatus.OK);
	}

	@DeleteMapping("/{mobileId}")
	public ResponseEntity<String> deletemobile(@PathVariable Integer mobileId) throws EcommerceException {
		mobileService.deletebyId(mobileId);
		return new ResponseEntity<>(environment.getProperty("API.DELETE_SUCCESS") + mobileId, HttpStatus.OK);
	}

	@PutMapping("/update/{mobileId}")
	public ResponseEntity<String> updatemobileData(@PathVariable Integer mobileId, @RequestBody Mobile mobile)
			throws EcommerceException {
		mobileService.updatemobileData(mobileId, mobile);
		return new ResponseEntity<>(environment.getProperty("API.UPDATE_SUCCESS"), HttpStatus.OK);
	}

	@PostMapping("/cart")
	public ResponseEntity<CartDTO> addItem(@RequestBody CartRequest cartRequest) throws EcommerceException {

		CartDTO cartDTO = cartService.addItem(cartRequest);
		return new ResponseEntity<>(cartDTO, HttpStatus.OK);

	}

	@GetMapping("/cart/{userId}")
	public ResponseEntity<List<CartDTO>> findByUserId(@PathVariable Integer userId) throws EcommerceException {
		List<CartDTO> cart = cartService.findByUserId(userId);
		return new ResponseEntity<>(cart, HttpStatus.OK);
	}

	@PatchMapping("/cartinc/{userId}/{mobileId}")
	public ResponseEntity<String> updtaeAddItem(@PathVariable Integer userId, @PathVariable Integer mobileId)
			throws EcommerceException {
		cartService.updateAddItemByOne(userId, mobileId);
		return null;

	}

	@PatchMapping("/cartdec/{userId}/{mobileId}")
	public ResponseEntity<String> updtaeSubItem(@PathVariable Integer userId, @PathVariable Integer mobileId)
			throws EcommerceException {
		cartService.updateSubItemByOne(userId, mobileId);
		return null;

	}

	@DeleteMapping("cart/{cartId}")
	public ResponseEntity<Void> deleteCartItem(@PathVariable Integer cartId) throws EcommerceException {
		cartService.deleteCartItem(cartId);
		return ResponseEntity.noContent().build();
	}

}
