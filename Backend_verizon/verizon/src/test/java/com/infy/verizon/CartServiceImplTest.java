package com.infy.verizon;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import com.infy.verizon.service.CartServiceImpl;

import java.util.*;

@ExtendWith(SpringExtension.class)
class CartServiceImplTest {

	@Mock
	private CartRepository cartRepository;

	@Mock
	private UserRepository userRepository;

	@Mock
	private MobileRepository mobileRepository;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	private CartServiceImpl cartService;

	private CartRequest cartRequest;
	private CartDTO cartDTO;
	private Cart cart;
	private User user;
	private Mobile mobile;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		user = new User();
		user.setUserId(1);
		user.setUserName("John Doe");

		mobile = new Mobile();
		mobile.setMobileId(1);
		mobile.setBrand("Samsung");

		cartRequest = new CartRequest();
		cartRequest.setUserId(1);
		cartRequest.setMobileId(1);

		cart = new Cart();
		cart.setCartId(1);
		cart.setUser(user);
		cart.setMobile(mobile);
		cart.setQuantity(1);

		cartDTO = new CartDTO();
		cartDTO.setCartId(1);
		cartDTO.setUserDTO(new UserDTO());
		cartDTO.setMobileDTO(new MobileDTO());
	}

	@Test
 void testAddItem() throws EcommerceException {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(mobileRepository.findById(1)).thenReturn(Optional.of(mobile));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);
        when(modelMapper.map(any(Cart.class), eq(CartDTO.class))).thenReturn(cartDTO);
        CartDTO result = cartService.addItem(cartRequest);
        assertNotNull(result);
        assertEquals(1, result.getCartId());
        verify(cartRepository, times(1)).save(any(Cart.class));
    }

	@Test
	void testFindByUserId() throws EcommerceException {
		List<Cart> cartList = new ArrayList<>();
		cartList.add(cart);
		when(userRepository.findById(1)).thenReturn(Optional.of(user));
		when(cartRepository.findByUser(user)).thenReturn(cartList);
		when(modelMapper.map(any(User.class), eq(UserDTO.class))).thenReturn(cartDTO.getUserDTO());
		when(modelMapper.map(any(Mobile.class), eq(MobileDTO.class))).thenReturn(cartDTO.getMobileDTO());
		when(modelMapper.map(any(Cart.class), eq(CartDTO.class))).thenReturn(cartDTO);
		List<CartDTO> result = cartService.findByUserId(1);
		assertNotNull(result);
		assertFalse(result.isEmpty());
		assertEquals(1, result.size());
		verify(cartRepository, times(1)).findByUser(user);
	}

	@Test
void testUpdateAddItemByOne() throws EcommerceException {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(mobileRepository.findById(1)).thenReturn(Optional.of(mobile));
        when(cartRepository.findByUserAndMobile(user, mobile)).thenReturn(Collections.singletonList(cart));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);
        cartService.updateAddItemByOne(1, 1);
        assertEquals(2, cart.getQuantity());
        verify(cartRepository, times(1)).save(any(Cart.class));
    }

	@Test
  void testUpdateSubItemByOne() throws EcommerceException {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(mobileRepository.findById(1)).thenReturn(Optional.of(mobile));
        when(cartRepository.findByUserAndMobile(user, mobile)).thenReturn(Collections.singletonList(cart));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);
        cartService.updateSubItemByOne(1, 1);
        assertEquals(0, cart.getQuantity());
        verify(cartRepository, times(1)).save(any(Cart.class));
    }

	@Test
	void testDeleteCartItem() throws EcommerceException {
	        when(cartRepository.existsById(1)).thenReturn(true);
	        cartService.deleteCartItem(1);
	        verify(cartRepository, times(1)).deleteByCartId(1);
	    }

}
