package com.infy.verizon;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.infy.verizon.dto.MobileDTO;
import com.infy.verizon.dto.OrderDTO;
import com.infy.verizon.dto.UserDTO;
import com.infy.verizon.entity.Mobile;
import com.infy.verizon.entity.Order;
import com.infy.verizon.entity.User;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.repository.MobileRepository;
import com.infy.verizon.repository.OrderRepository;
import com.infy.verizon.repository.UserRepository;
import com.infy.verizon.service.OrderServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

@ExtendWith(SpringExtension.class)
class OrderServiceImplTest {

	@Mock
	private OrderRepository orderRepository;

	@Mock
	private UserRepository userRepository;

	@Mock
	private MobileRepository mobileRepository;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	private OrderServiceImpl orderService;

	private OrderDTO orderDTO;
	private User user;
	private Mobile mobile;
	private Order order;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		
		user = new User();
		user.setUserId(1);
		user.setUserName("John Doe");

		mobile = new Mobile();
		mobile.setMobileId(1);
		mobile.setBrand("Samsung");

		orderDTO = new OrderDTO();
		orderDTO.setUserDTO(new UserDTO());
		orderDTO.getUserDTO().setUserId(1);
		orderDTO.setMobileDTO(new MobileDTO());
		orderDTO.getMobileDTO().setMobileId(1);

		order = new Order();
		order.setOrderId(1);
		order.setUser(user);
		order.setMobile(mobile);
	}

	@Test
   void testCreateOrder() throws EcommerceException {
        when(modelMapper.map(any(OrderDTO.class), eq(Order.class))).thenReturn(order);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(mobileRepository.findById(1)).thenReturn(Optional.of(mobile));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        Integer result = orderService.createOrder(orderDTO, 1, 1);

        assertNotNull(result);
        assertEquals(1, result);
        verify(orderRepository, times(1)).save(any(Order.class));
    }

	@Test
	void testGetAllOrdersList() throws EcommerceException {
		List<Order> orders = new ArrayList<>();
		orders.add(order);

		when(orderRepository.findAll()).thenReturn(orders);

		Iterable<Order> result = orderService.getallordersList(order);

		assertNotNull(result);
		assertTrue(result.iterator().hasNext());
		verify(orderRepository, times(1)).findAll();
	}

	@Test
	void testGetOrderByUserId_Found() throws EcommerceException {
		List<Order> orders = new ArrayList<>();
		orders.add(order);

		when(userRepository.findById(1)).thenReturn(Optional.of(user));
		when(orderRepository.findByUser(user)).thenReturn(orders);
		when(modelMapper.map(any(Order.class), eq(OrderDTO.class))).thenReturn(orderDTO);
		when(modelMapper.map(any(User.class), eq(UserDTO.class))).thenReturn(orderDTO.getUserDTO());
		when(modelMapper.map(any(Mobile.class), eq(MobileDTO.class))).thenReturn(orderDTO.getMobileDTO());

		List<OrderDTO> result = orderService.getorderByUserId(1);

		assertNotNull(result);
		assertFalse(result.isEmpty());
		assertEquals(1, result.size());
		verify(orderRepository, times(1)).findByUser(user);
	}

	@Test
  void testGetOrderByUserId_NotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(orderRepository.findByUser(user)).thenReturn(Collections.emptyList());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            orderService.getorderByUserId(1);
        });

        assertEquals("USER_NOT_FOUND", exception.getMessage());
        verify(orderRepository, times(1)).findByUser(user);
    }

	@Test
  void testGetOrderByUserId_UserNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            orderService.getorderByUserId(1);
        });

        assertEquals("USER_ID_NOT_FOUND", exception.getMessage());
        verify(userRepository, times(1)).findById(1);
    }
}
