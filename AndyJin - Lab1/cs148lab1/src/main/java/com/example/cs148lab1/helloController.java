package com.example.cs148lab1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")  // Base URL: http://localhost:8080
public class helloController {

    @GetMapping("/")  // Maps to: http://localhost:8080/api/hello
    public String sayHello() {
        return "Hello, World!";
    }
}
