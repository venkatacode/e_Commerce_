package com.infy.verizon.service;

import java.util.List;

import com.infy.verizon.dto.CartDTO;
import com.infy.verizon.dto.UserDTO;
import com.infy.verizon.expection.EcommerceException;

public interface UserService {

	public UserDTO registerUser(UserDTO userdto) throws EcommerceException;

	public UserDTO getUserByNameAndPassword(String userName, String password) throws EcommerceException;

	public List<UserDTO> getUserId(Integer userId) throws EcommerceException;

	public void deleteBooking(Integer userId) throws EcommerceException;

	public void updateProfile(Integer userId, UserDTO userdto) throws EcommerceException;

	public List<CartDTO> getCartId(Integer userId) throws EcommerceException;
}
