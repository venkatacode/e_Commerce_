package com.infy.verizon.service;

import java.util.ArrayList;

import java.util.List;

import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;
import com.infy.verizon.dto.MobileDTO;
import com.infy.verizon.entity.Mobile;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.repository.MobileRepository;

@Service
public class MobileServiceImpl implements MobileService {

	private MobileRepository mobilerepo;

	private ModelMapper modelMapper = new ModelMapper();

	public MobileServiceImpl(MobileRepository mobilerepo) {
		this.mobilerepo = mobilerepo;
	}

	@Override
	public MobileDTO addmobiles(MobileDTO mobileDTO) throws EcommerceException {
		Mobile mobile = modelMapper.map(mobileDTO, Mobile.class);
		mobilerepo.save(mobile);
		return modelMapper.map(mobile, MobileDTO.class);
	}

	public List<Mobile> getallmobiles(Mobile mobile) throws EcommerceException {
		return mobilerepo.findAll();
	}

	public List<MobileDTO> getmobilebyId(Integer mobileId, Mobile newmobile) throws EcommerceException {
		Mobile mobile = mobilerepo.findById(newmobile.getMobileId())
				.orElseThrow(() -> new EcommerceException("MOBILE_NOT_FOUND"));
		List<Mobile> mobileList = new ArrayList<>();
		Mobile mobiles = new Mobile();
		mobiles.setBattery(mobile.getBattery());
		mobiles.setBrand(mobile.getBrand());
		mobiles.setCamera(mobile.getCamera());
		mobiles.setColor(mobile.getColor());
		mobiles.setDisplaySize(mobile.getDisplaySize());
		mobiles.setRam(mobile.getRam());
		mobiles.setImageUrl(mobile.getImageUrl());
		mobiles.setModel(mobile.getModel());
		mobiles.setPrice(mobile.getPrice());
		mobiles.setProcessor(mobile.getProcessor());
		mobiles.setStorage(mobile.getStorage());
		mobiles.setMobileId(mobile.getMobileId());
		mobileList.add(mobiles);
		MobileDTO mobileDTO = modelMapper.map(mobiles, MobileDTO.class);
		List<MobileDTO> mobileDTOs = new ArrayList<>();
		mobileDTOs.add(mobileDTO);
		return mobileDTOs;
	}

	@Override
	public List<MobileDTO> getmobileBybrand(String brand) throws EcommerceException {

		List<Mobile> mobile = mobilerepo.findByBrand(brand);
		if (mobile.isEmpty()) {
			throw new EcommerceException("BRAND_NOT_FOUND");
		}
		List<MobileDTO> mobilesList = new ArrayList<>();
		for (Mobile mobi : mobile) {
			MobileDTO mobiles = modelMapper.map(mobi, MobileDTO.class);
			mobilesList.add(mobiles);
		}

		return mobilesList;
	}

	@Override
	public List<MobileDTO> getmobileBycolor(String color) throws EcommerceException {

		List<Mobile> mobile = mobilerepo.findByColor(color);
		if (mobile.isEmpty()) {
			throw new EcommerceException("COLOR_NOT_FOUND");
		}
		List<MobileDTO> mobilesList = new ArrayList<>();
		for (Mobile mobi : mobile) {
			MobileDTO mobiles = modelMapper.map(mobi, MobileDTO.class);
			mobilesList.add(mobiles);
		}
		return mobilesList;
	}

	@Override
	public void deletebyId(Integer mobileId) throws EcommerceException {
		mobilerepo.deleteById(mobileId);
	}

	@Override
	public void updatemobileData(Integer mobileId, Mobile mobile) throws EcommerceException {

		Mobile existingmobile = mobilerepo.findById(mobileId)
				.orElseThrow(() -> new EcommerceException("MOBILE_ID_NOT_FOUND"));

		existingmobile.setBattery(mobile.getBattery());
		existingmobile.setBrand(mobile.getBrand());
		existingmobile.setCamera(mobile.getCamera());
		existingmobile.setColor(mobile.getColor());
		existingmobile.setDisplaySize(mobile.getDisplaySize());
		existingmobile.setImageUrl(mobile.getImageUrl());
		existingmobile.setModel(mobile.getModel());
		existingmobile.setPrice(mobile.getPrice());
		existingmobile.setProcessor(mobile.getProcessor());
		existingmobile.setRam(mobile.getRam());
		existingmobile.setStorage(mobile.getStorage());
		mobilerepo.save(existingmobile);
	}

}
