package com.chillout.userservice.service;

import com.chillout.userservice.dto.UserRegistrationDTO;
import com.chillout.userservice.dto.UserResponseDTO;
import com.chillout.userservice.dto.UserUpdateDTO;

import java.util.List;

public interface UserService {

    UserResponseDTO createUser(UserRegistrationDTO registrationDTO);

    UserResponseDTO getUserById(Long id);

    UserResponseDTO getUserByUsername(String username);

    UserResponseDTO getUserByPhoneNumber(String phoneNumber);

    UserResponseDTO updateUser(Long id, UserUpdateDTO updateDTO);

    void deleteUser(Long id);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO addLoyaltyPoints(Long id, Integer points);
}
