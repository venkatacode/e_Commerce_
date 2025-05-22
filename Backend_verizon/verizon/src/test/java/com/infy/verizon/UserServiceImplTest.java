package com.infy.verizon;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.infy.verizon.dto.CartDTO;
import com.infy.verizon.dto.UserDTO;
import com.infy.verizon.entity.Cart;
import com.infy.verizon.entity.User;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.repository.CartRepository;
import com.infy.verizon.repository.UserRepository;
import com.infy.verizon.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

@ExtendWith(SpringExtension.class)
class UserServiceImplTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private CartRepository cartRepository;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	private UserServiceImpl userService;

	private UserDTO userDTO;
	private User user;
	private Cart cart;
	private CartDTO cartDTO;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		userDTO = new UserDTO();
		userDTO.setUserId(1);
		userDTO.setUserName("john_doe");
		userDTO.setUserEmail("john.doe@example.com");
		userDTO.setPhoneNo(1234567890L);

		user = new User();
		user.setUserId(1);
		user.setUserName("john_doe");
		user.setUserEmail("john.doe@example.com");
		user.setPhoneNo(1234567890L);

		cart = new Cart();
		cart.setCartId(1);
		cart.setUser(user);

		cartDTO = new CartDTO();
		cartDTO.setCartId(1);
		cartDTO.setUserDTO(modelMapper.map(user, UserDTO.class));
	}

	@Test
    void testRegisterUser_ExistingEmail() {
        when(userRepository.findByUserEmail(userDTO.getUserEmail())).thenReturn(Collections.singletonList(user));

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.registerUser(userDTO);
        });

        assertEquals("User with this email already exists", exception.getMessage());
        verify(userRepository, times(0)).save(any(User.class));
    }

	@Test
    void testRegisterUser_ExistingUserName() {
        when(userRepository.findByUserEmail(userDTO.getUserEmail())).thenReturn(Collections.emptyList());
        when(userRepository.findByUserName(userDTO.getUserName())).thenReturn(Collections.singletonList(user));

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.registerUser(userDTO);
        });

        assertEquals("User with this username already exists", exception.getMessage());
        verify(userRepository, times(0)).save(any(User.class));
    }

	@Test
	void testRegisterUser_Success() throws EcommerceException {
		UserDTO userDTO = new UserDTO(1, "test@example.com", "testuser", "tester@123", "Test User", "Mysore", "Mysore",
				"Karnataka", "India", 7665432, 1234567890L);
		User user = new User(1, "test@example.com", "testuser", "tester@123", "Test User", "Mysore", "Mysore",
				"Karnataka", "India", 7665432, 1234567890L);

		when(userRepository.findByUserEmail(userDTO.getUserEmail())).thenReturn(Collections.emptyList());
		when(userRepository.findByUserName(userDTO.getUserName())).thenReturn(Collections.emptyList());
		when(userRepository.findByPhoneNo(userDTO.getPhoneNo())).thenReturn(Collections.emptyList());
		when(modelMapper.map(userDTO, User.class)).thenReturn(user);
		when(userRepository.save(user)).thenReturn(user);
		when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

		UserDTO result = userService.registerUser(userDTO);

		assertNotNull(result);
		assertEquals(userDTO.getUserEmail(), result.getUserEmail());
		assertEquals(userDTO.getUserName(), result.getUserName());
		assertEquals(userDTO.getPhoneNo(), result.getPhoneNo());

		verify(userRepository).save(user);
		verify(modelMapper).map(userDTO, User.class);
		verify(modelMapper).map(user, UserDTO.class);

	}

	@Test
    void testRegisterUser_ExistingPhoneNumber() {
        when(userRepository.findByUserEmail(userDTO.getUserEmail())).thenReturn(Collections.emptyList());
        when(userRepository.findByUserName(userDTO.getUserName())).thenReturn(Collections.emptyList());
        when(userRepository.findByPhoneNo(userDTO.getPhoneNo())).thenReturn(Collections.singletonList(user));

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.registerUser(userDTO);
        });

        assertEquals("User with this phone number already exists", exception.getMessage());
        verify(userRepository, times(0)).save(any(User.class));
    }

	@Test
    void testGetUserByNameAndPassword() throws EcommerceException {
        when(userRepository.findByUserNameAndPassword(userDTO.getUserName(), "password")).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userService.getUserByNameAndPassword(userDTO.getUserName(), "password");

        assertNotNull(result);
        assertEquals(userDTO.getUserName(), result.getUserName());
    }

	@Test
    void testGetUserByNameAndPassword_UserNotFound() {
        when(userRepository.findByUserNameAndPassword(userDTO.getUserName(), "password")).thenReturn(Optional.empty());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.getUserByNameAndPassword(userDTO.getUserName(), "password");
        });

        assertEquals("Service.USER_NOT_FOUND", exception.getMessage());
    }

	@Test
    void testGetUserById() throws EcommerceException {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        List<UserDTO> result = userService.getUserId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(userDTO.getUserName(), result.get(0).getUserName());
    }

	@Test
    void testGetUserById_UserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.getUserId(1);
        });

        assertEquals("Service.USER_ID_NOT_FOUND", exception.getMessage());
    }

	@Test
    void testDeleteBooking() throws EcommerceException {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        userService.deleteBooking(1);

        verify(userRepository, times(1)).deleteById(1);
    }

	@Test
    void testDeleteBooking_UserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.deleteBooking(1);
        });

        assertEquals("Service.USER_ID_NOT_FOUND", exception.getMessage());
    }

	@Test
    void testUpdateProfile() throws EcommerceException {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        userService.updateProfile(1, userDTO);

        verify(userRepository, times(1)).save(any(User.class));
    }

	@Test
    void testUpdateProfile_UserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.updateProfile(1, userDTO);
        });

        assertEquals("User Id is not present in DB", exception.getMessage());
    }

	@Test
    void testGetCartId() throws EcommerceException {
        when(userRepository.findByUserId(1)).thenReturn(Optional.of(user));
        when(cartRepository.findByUser(user)).thenReturn(Collections.singletonList(cart));
        when(modelMapper.map(cart, CartDTO.class)).thenReturn(cartDTO);

        List<CartDTO> result = userService.getCartId(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(cartDTO.getCartId(), result.get(0).getCartId());
    }

	@Test
    void testGetCartId_CartNotFound() {
        when(userRepository.findByUserId(1)).thenReturn(Optional.of(user));
        when(cartRepository.findByUser(user)).thenReturn(Collections.emptyList());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            userService.getCartId(1);
        });

        assertEquals("Service.CART_NOT_FOUND", exception.getMessage());
    }
}
