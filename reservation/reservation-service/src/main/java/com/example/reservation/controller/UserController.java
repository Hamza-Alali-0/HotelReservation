package com.example.reservation.controller;

import com.example.reservation.entity.User;
import com.example.reservation.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        Optional<User> u = userRepository.findById(id);
        return u.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody User user) {
        if (user.getId() == null) return ResponseEntity.badRequest().build();
        Optional<User> existing = userRepository.findById(user.getId());
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        var u = existing.get();
        u.setFullname(user.getFullname());
        u.setEmail(user.getEmail());
        // do not overwrite password here
        userRepository.save(u);
        return ResponseEntity.ok(u);
    }
}
