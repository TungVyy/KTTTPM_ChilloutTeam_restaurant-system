package com.chillout.userservice.service;

import com.chillout.userservice.dto.UserRegistrationDTO;
import com.chillout.userservice.dto.UserResponseDTO;
import com.chillout.userservice.dto.UserUpdateDTO;
import com.chillout.userservice.entity.User;
import com.chillout.userservice.entity.User.MembershipTier;
import com.chillout.userservice.entity.User.Role;
import com.chillout.userservice.exception.BadRequestException;
import com.chillout.userservice.exception.ResourceNotFoundException;
import com.chillout.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserResponseDTO createUser(UserRegistrationDTO dto) {
        // Validation Checks
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new BadRequestException("Username '" + dto.getUsername() + "' is already taken.");
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BadRequestException("Email '" + dto.getEmail() + "' is already registered.");
        }
        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new BadRequestException("Phone number '" + dto.getPhoneNumber() + "' is already registered.");
        }

        // Determine Role
        Role role = Role.CUSTOMER;
        if (dto.getRole() != null) {
            try {
                role = Role.valueOf(dto.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid role: " + dto.getRole());
            }
        }

        // Create User Entity
        User user = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword()) // In a real auth service, we would BCrypt encode this.
                .email(dto.getEmail())
                .fullName(dto.getFullName())
                .phoneNumber(dto.getPhoneNumber())
                .role(role)
                .loyaltyPoints(0)
                .membershipTier(MembershipTier.BRONZE)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);
        return UserResponseDTO.fromEntity(savedUser);
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserResponseDTO.fromEntity(user);
    }

    @Override
    public UserResponseDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return UserResponseDTO.fromEntity(user);
    }

    @Override
    public UserResponseDTO getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with phone number: " + phoneNumber));
        return UserResponseDTO.fromEntity(user);
    }

    @Override
    @Transactional
    public UserResponseDTO updateUser(Long id, UserUpdateDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Update fields if provided
        if (dto.getFullName() != null) {
            user.setFullName(dto.getFullName());
        }

        if (dto.getEmail() != null && !dto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(dto.getEmail())) {
                throw new BadRequestException("Email '" + dto.getEmail() + "' is already taken.");
            }
            user.setEmail(dto.getEmail());
        }

        if (dto.getPhoneNumber() != null && !dto.getPhoneNumber().equals(user.getPhoneNumber())) {
            if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
                throw new BadRequestException("Phone number '" + dto.getPhoneNumber() + "' is already taken.");
            }
            user.setPhoneNumber(dto.getPhoneNumber());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(dto.getPassword());
        }

        if (dto.getActive() != null) {
            user.setActive(dto.getActive());
        }

        User updatedUser = userRepository.save(user);
        return UserResponseDTO.fromEntity(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponseDTO addLoyaltyPoints(Long id, Integer points) {
        if (points == null || points <= 0) {
            throw new BadRequestException("Points to add must be positive.");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        int newPoints = user.getLoyaltyPoints() + points;
        user.setLoyaltyPoints(newPoints);

        // Membership Tier Promotion Logic
        if (newPoints >= 1000) {
            user.setMembershipTier(MembershipTier.DIAMOND);
        } else if (newPoints >= 500) {
            user.setMembershipTier(MembershipTier.GOLD);
        } else if (newPoints >= 100) {
            user.setMembershipTier(MembershipTier.SILVER);
        } else {
            user.setMembershipTier(MembershipTier.BRONZE);
        }

        User updatedUser = userRepository.save(user);
        return UserResponseDTO.fromEntity(updatedUser);
    }
}
