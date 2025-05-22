package com.infy.verizon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.verizon.entity.Cart;
import com.infy.verizon.entity.Mobile;
import com.infy.verizon.entity.User;

public interface CartRepository extends JpaRepository<Cart, Integer> {

	public List<Cart> findByUser(User user);

	public List<Cart> findByUserAndMobile(User user, Mobile mobile);

	public void deleteByCartId(Integer cartId);
}
