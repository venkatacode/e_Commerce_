package com.infy.verizon.service;

import java.util.List;

import com.infy.verizon.dto.MobileDTO;

import com.infy.verizon.entity.Mobile;
import com.infy.verizon.expection.EcommerceException;

public interface MobileService {

	
	public MobileDTO addmobiles(MobileDTO mobilesDTO) throws EcommerceException;

	public List<Mobile> getallmobiles(Mobile mobile) throws EcommerceException;
	
	public List<MobileDTO> getmobilebyId(Integer mobileId,Mobile newmobile) throws EcommerceException;
	
	public List<MobileDTO> getmobileBybrand(String brand) throws EcommerceException;
	
	public List<MobileDTO> getmobileBycolor(String brand) throws EcommerceException;
	
	public void deletebyId(Integer mobileId) throws EcommerceException;
	
	public void updatemobileData(Integer mobileId,Mobile mobile) throws EcommerceException;

}
