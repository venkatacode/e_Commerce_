package com.infy.verizon.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.verizon.entity.Mobile;

public interface MobileRepository extends JpaRepository<Mobile, Integer>{
	 
	public List<Mobile> findByBrand(String brand);
	public List<Mobile> findByColor(String color);
}
