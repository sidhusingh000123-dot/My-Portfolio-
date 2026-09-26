package com.portfolio.portfolio.controller;

import com.portfolio.portfolio.model.ContactMessage;
import com.portfolio.portfolio.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping
    public ResponseEntity<?> submitMessage(@Valid @RequestBody ContactMessage contactMessage) {
        contactMessageRepository.save(contactMessage);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Thanks for reaching out! I'll get back to you soon."
        ));
    }
}
