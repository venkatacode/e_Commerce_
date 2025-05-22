package com.infy.verizon.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.infy.verizon.dto.CartDTO;
import com.infy.verizon.dto.MobileDTO;
import com.infy.verizon.dto.UserDTO;
import com.infy.verizon.entity.Cart;
import com.infy.verizon.entity.User;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.repository.CartRepository;
import com.infy.verizon.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	private CartRepository cartRepository;

	private ModelMapper modelMapper = new ModelMapper();

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	public static final String USER_ID_NOT_FOUND = "Service.USER_ID_NOT_FOUND";

	@Autowired
	private UserServiceImpl(UserRepository userRepository, CartRepository cartRepository) {
		this.userRepository = userRepository;
		this.cartRepository = cartRepository;

	}

	public UserServiceImpl() {
		modelMapper.getConfiguration().setPropertyCondition(context -> context.getSource() != null);
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
	}

	public UserDTO registerUser(UserDTO userdto) throws EcommerceException {
		logger.info("Registering user with email: {}, username: {}, and phone number: {}", userdto.getUserEmail(),
				userdto.getUserName(), userdto.getPhoneNo());

		List<User> existingUsersByEmail = userRepository.findByUserEmail(userdto.getUserEmail());
		if (!existingUsersByEmail.isEmpty()) {
			logger.info("User with email {} already exists", userdto.getUserEmail());
			throw new EcommerceException("User with this email already exists");
		}

		List<User> existingUsersByUserName = userRepository.findByUserName(userdto.getUserName());
		if (!existingUsersByUserName.isEmpty()) {
			logger.info("User with username {} already exists", userdto.getUserName());
			throw new EcommerceException("User with this username already exists");
		}

		List<User> existingUsersByPhoneNo = userRepository.findByPhoneNo(userdto.getPhoneNo());
		if (!existingUsersByPhoneNo.isEmpty()) {
			logger.info("User with phone number {} already exists", userdto.getPhoneNo());
			throw new EcommerceException("User with this phone number already exists");
		}

		User user = modelMapper.map(userdto, User.class);
		userRepository.save(user);
		logger.info("User with email {}, username {}, and phone number {} successfully registered",
				userdto.getUserEmail(), userdto.getUserName(), userdto.getPhoneNo());

		return modelMapper.map(user, UserDTO.class);
	}

	public UserDTO getUserByNameAndPassword(String userName, String password) throws EcommerceException {
		logger.info("Attempting to retrieve user with username: {}", userName);
		Optional<User> user = userRepository.findByUserNameAndPassword(userName, password);
		if (user.isPresent()) {
			logger.info("User found with username: {}", userName);
			return modelMapper.map(user.get(), UserDTO.class);
		} else {
			logger.warn("User not found with username: {}", userName);
			throw new EcommerceException("Service.USER_NOT_FOUND");
		}
	}

	public List<UserDTO> getUserId(Integer userId) throws EcommerceException {
		logger.info("Attempting to retrieve user with ID: {}", userId);
		Optional<User> user = userRepository.findById(userId);
		User users = user.orElseThrow(() -> new EcommerceException(USER_ID_NOT_FOUND));
		UserDTO userdto = modelMapper.map(users, UserDTO.class);
		logger.info("User with ID: {} successfully retrieved", userId);
		return List.of(userdto);

	}

	public void deleteBooking(Integer userId) throws EcommerceException {
		logger.info("Attempting to delete user with ID: {}", userId);
		User user = userRepository.findById(userId).orElseThrow(() -> new EcommerceException(USER_ID_NOT_FOUND));
		userRepository.deleteById(user.getUserId());
		logger.info("User with ID: {} successfully deleted", userId);
	}

	public void updateProfile(Integer userId, UserDTO userdto) throws EcommerceException {
		logger.info("Attempting to update profile for user with ID: {}", userId);
		Optional<User> user = userRepository.findById(userId);
		User users = user.orElseThrow(() -> new EcommerceException("User Id is not present in DB"));
		logger.info("User with ID: {} found. Updating profile...", userId);
		modelMapper.map(userdto, users);
		userRepository.save(users);
		logger.info("Profile for user with ID: {} successfully updated", userId);
	}

	public List<CartDTO> getCartId(Integer userId) throws EcommerceException {
		logger.info("Attempting to retrieve cart for user with ID: {}", userId);

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new EcommerceException(USER_ID_NOT_FOUND));
		List<Cart> carts = cartRepository.findByUser(user);
		if (carts.isEmpty()) {
			throw new EcommerceException("Service.CART_NOT_FOUND");
		}
		List<CartDTO> cartDTOs = carts.stream().map(cart -> {
			CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
			cartDTO.setUserDTO(modelMapper.map(cart.getUser(), UserDTO.class));
			cartDTO.setMobileDTO(modelMapper.map(cart.getMobile(), MobileDTO.class));
			return cartDTO;
		}).toList();

		logger.info("Cart(s) for user with ID: {} successfully retrieved", userId);

		return cartDTOs;

	}
}
