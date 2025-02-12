package com.example.backend.Controller;

import com.example.backend.Entity.EmailRequest;
import com.example.backend.Service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmail(emailRequest);
        return ResponseEntity.ok(response);
    }
}
