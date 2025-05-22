package com.infy.verizon.controller;

import java.util.List;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.infy.verizon.dto.OrderDTO;
import com.infy.verizon.dto.UserDTO;
import com.infy.verizon.entity.Order;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.service.OrderService;
import com.infy.verizon.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/verizon")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderUserController {

	private OrderService ordersService;
	private UserService userservice;
	private Environment environment;

	public OrderUserController(OrderService ordersService, UserService userService, Environment environment) {
		this.ordersService = ordersService;
		this.userservice = userService;
		this.environment = environment;
	}

	@PostMapping("/addorder")
	public ResponseEntity<String> addorders(@RequestBody OrderDTO orderdto, Integer userId, Integer mobileId)
			throws EcommerceException {
		ordersService.createOrder(orderdto, userId, mobileId);
		return new ResponseEntity<>("Updated Succesfuuly", HttpStatus.OK);
	}

	@GetMapping("/orders")
	public ResponseEntity<Iterable<Order>> getAllOrders(Order order) throws EcommerceException {
		Iterable<Order> orders = ordersService.getallordersList(order);
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<OrderDTO>> getorderByuserId(@PathVariable Integer userId) throws EcommerceException {

		List<OrderDTO> orderList = ordersService.getorderByUserId(userId);
		return new ResponseEntity<>(orderList, HttpStatus.OK);
	}

	@PostMapping("register")
	public ResponseEntity<String> registerUSer(@Valid @RequestBody UserDTO userdto) throws EcommerceException {
		try {
			userservice.registerUser(userdto);
			String successMessage = environment.getProperty("API.REGISTER_SUCCESS");
			return new ResponseEntity<>(successMessage, HttpStatus.CREATED);
		} catch (EcommerceException e) {
			String errorMessage = e.getMessage();
			if (errorMessage.contains("email")) {
				return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
			} else if (errorMessage.contains("username")) {
				return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
			} else if (errorMessage.contains("phone number")) {
				return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
			} else {
				return new ResponseEntity<>(environment.getProperty("API.REGISTER_FAILURE"), HttpStatus.BAD_REQUEST);
			}
		}
	}

	@PostMapping("getuser")
	public ResponseEntity<UserDTO> getUser(@RequestBody UserDTO userDTO) {
		try {
			UserDTO foundUser = userservice.getUserByNameAndPassword(userDTO.getUserName(), userDTO.getPassword());
			environment.getProperty("API.LOGIN_SUCCESS");
			return new ResponseEntity<>(foundUser, HttpStatus.OK);
		} catch (EcommerceException e) {
			environment.getProperty("API.LOGIN_FAILURE");
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("getuser/{userId}")
	public ResponseEntity<List<UserDTO>> getUser(@PathVariable Integer userId) throws EcommerceException {
		List<UserDTO> list = userservice.getUserId(userId);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@DeleteMapping("delete/{userId}")
	public ResponseEntity<String> deleteBooking(@PathVariable Integer userId) throws EcommerceException {
		try {
			userservice.deleteBooking(userId);
			String successMessage = environment.getProperty("API.DELETE_SUCCESS") + " " + userId;
			return new ResponseEntity<>(successMessage, HttpStatus.OK);
		} catch (EcommerceException e) {
			String errorMessage = environment.getProperty("API.DELETE_FAILURE") + " " + userId;
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("updateuser/{userId}")
	ResponseEntity<String> updateProfile(@PathVariable Integer userId, @Valid @RequestBody UserDTO usedto)
			throws EcommerceException {

		try {
			userservice.updateProfile(userId, usedto);
			String successMessage = environment.getProperty("API.UPDATE_SUCCESS", "Successfully updated") + " "
					+ userId;
			return new ResponseEntity<>(successMessage, HttpStatus.OK);
		} catch (EcommerceException e) {
			String errorMessage = environment.getProperty("API.UPDATE_FAILURE", "Failed to update booking") + " "
					+ userId;
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}

}
