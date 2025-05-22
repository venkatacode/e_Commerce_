package com.infy.verizon.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.infy.verizon.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findByUserEmail(@Param("userEmail") String userEmail);

	Optional<User> findByUserNameAndPassword(String userName, String password);

	Optional<User> findByUserId(Integer userId);

	List<User> findByUserName(String userName);

	List<User> findByPhoneNo(Long phoneNo);

}
