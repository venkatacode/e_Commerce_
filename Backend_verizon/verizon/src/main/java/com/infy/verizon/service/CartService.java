package com.infy.verizon.service;
import java.util.List;
import com.infy.verizon.dto.CartDTO;
import com.infy.verizon.dto.CartRequest;
import com.infy.verizon.expection.EcommerceException;
 
public interface CartService {
	
	public CartDTO addItem(CartRequest cartRequest) throws EcommerceException;
 
	public List<CartDTO> findByUserId(Integer userId) throws EcommerceException;
	
	public void updateAddItemByOne(Integer userId,Integer mobileId) throws EcommerceException;
	
	public void updateSubItemByOne(Integer userId,Integer mobileId) throws EcommerceException;
	
	void deleteCartItem( Integer cartId)throws EcommerceException;
}
