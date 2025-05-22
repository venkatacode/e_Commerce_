package com.infy.verizon.service;

import java.util.List;

import com.infy.verizon.dto.OrderDTO;
import com.infy.verizon.entity.Order;
import com.infy.verizon.expection.EcommerceException;

public interface OrderService {

	public Integer createOrder(OrderDTO orderdto, Integer userId, Integer mobileId) throws EcommerceException;

	public Iterable<Order> getallordersList(Order order) throws EcommerceException;

	public List<OrderDTO> getorderByUserId(Integer userId) throws EcommerceException;
}
