package com.infy.verizon.service;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.infy.verizon.dto.CartDTO;
import com.infy.verizon.dto.CartRequest;
import com.infy.verizon.dto.MobileDTO;
import com.infy.verizon.dto.UserDTO;
import com.infy.verizon.entity.Cart;
import com.infy.verizon.entity.Mobile;
import com.infy.verizon.entity.User;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.repository.CartRepository;
import com.infy.verizon.repository.MobileRepository;
import com.infy.verizon.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImpl implements CartService {

	private CartRepository cartRepository;

	private UserRepository userRepository;

	private MobileRepository mobileRepository;

	public CartServiceImpl(MobileRepository mobileRepository, CartRepository cartRepository,
			UserRepository userRepository) {
		this.mobileRepository = mobileRepository;
		this.cartRepository = cartRepository;
		this.userRepository = userRepository;

	}

	private ModelMapper modelMapper = new ModelMapper();

	@Override
	public CartDTO addItem(CartRequest cartRequest) throws EcommerceException {
		Optional<User> optionalUser = userRepository.findById(cartRequest.getUserId());
		User user = optionalUser.get();
		Optional<Mobile> optionalMobile = mobileRepository.findById(cartRequest.getMobileId());
		Mobile mobile = optionalMobile.get();
		Cart cart = new Cart();
		cart.setMobile(mobile);
		cart.setUser(user);
		cart.setQuantity(1);
		Cart newCart = cartRepository.save(cart);
		return modelMapper.map(newCart, CartDTO.class); 	
	}

	@Override
	public List<CartDTO> findByUserId(Integer userId) throws EcommerceException {

		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElseThrow(() -> new EcommerceException(""));
		Iterable<Cart> cartfetched = cartRepository.findByUser(user);
		List<CartDTO> cartList = new ArrayList<>();
		for (Cart cart : cartfetched) {
			UserDTO userDTO = modelMapper.map(cart.getUser(), UserDTO.class);
			MobileDTO mobileDTO = modelMapper.map(cart.getMobile(), MobileDTO.class);
			CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
			cartDTO.setUserDTO(userDTO);
			cartDTO.setMobileDTO(mobileDTO);
			cartList.add(cartDTO);
		}
		return cartList;
	}

	@Override
	public void updateAddItemByOne(Integer userId, Integer mobileId) throws EcommerceException {
		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElseThrow(() -> new EcommerceException(""));
		Optional<Mobile> optionalMobile = mobileRepository.findById(mobileId);
		Mobile mobile = optionalMobile.orElseThrow(() -> new EcommerceException(""));
		Iterable<Cart> cartfetched = cartRepository.findByUserAndMobile(user, mobile);
		for (Cart cart : cartfetched) {
			cart.setQuantity((cart.getQuantity()) + 1);
			cartRepository.save(cart);
		}
	}

	@Override
	public void updateSubItemByOne(Integer userId, Integer mobileId) throws EcommerceException {
		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElseThrow(() -> new EcommerceException(""));
		Optional<Mobile> optionalMobile = mobileRepository.findById(mobileId);
		Mobile mobile = optionalMobile.orElseThrow(() -> new EcommerceException(""));
		Iterable<Cart> cartfetched = cartRepository.findByUserAndMobile(user, mobile);
		for (Cart cart : cartfetched) {
			cart.setQuantity((cart.getQuantity()) - 1);
			cartRepository.save(cart);
		}
	}

	@Override
	@Transactional
	public void deleteCartItem(Integer cartId) throws EcommerceException {
		if (cartRepository.existsById(cartId)) {
			cartRepository.deleteByCartId(cartId);
		}

	}
}
