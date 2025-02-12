package com.example.backend.Entity;

import lombok.Data;
import org.springframework.context.annotation.Bean;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
