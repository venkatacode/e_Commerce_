package com.infy.verizon.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
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

@Service
public class OrderServiceImpl implements OrderService {

	private ModelMapper modelMapper = new ModelMapper();

	private OrderRepository orderrepo;

	private UserRepository userRepository;

	private MobileRepository mobilerepo;

	public OrderServiceImpl(OrderRepository orderrepo, UserRepository userRepository, MobileRepository mobilerepo) {
		this.orderrepo = orderrepo;
		this.userRepository = userRepository;
		this.mobilerepo = mobilerepo;
	}

	@Override
	public Integer createOrder(OrderDTO orderdto, Integer userId, Integer mobileId) throws EcommerceException {

		Order order1 = modelMapper.map(orderdto, Order.class);
		User optionaluser = userRepository.findById(orderdto.getUserDTO().getUserId())
				.orElseThrow(() -> new EcommerceException(""));
		if (optionaluser == null) {
			throw new EcommerceException("UserId not found");
		}
		Mobile optionalMobile = mobilerepo.findById(orderdto.getMobileDTO().getMobileId())
				.orElseThrow(() -> new EcommerceException(""));
		if (optionalMobile == null) {
			throw new EcommerceException("Mobile Id not found");
		}
		order1.setUser(optionaluser);
		order1.setMobile(optionalMobile);
		orderrepo.save(order1);
		return mobileId;

	}

	public Iterable<Order> getallordersList(Order order) throws EcommerceException {
		return orderrepo.findAll();
	}

	public List<OrderDTO> getorderByUserId(Integer userId) throws EcommerceException {
		User user = userRepository.findById(userId).orElseThrow(() -> new EcommerceException("USER_ID_NOT_FOUND"));
		List<Order> orderList = orderrepo.findByUser(user);
		if (orderList.isEmpty()) {
			throw new EcommerceException("USER_NOT_FOUND");
		}

		return orderList.stream().map(order -> {
			OrderDTO orderdto = modelMapper.map(order, OrderDTO.class);

			orderdto.setUserDTO(modelMapper.map(order.getUser(), UserDTO.class));
			orderdto.setMobileDTO(modelMapper.map(order.getMobile(), MobileDTO.class));
			return orderdto;
		}).toList();
	}

}
