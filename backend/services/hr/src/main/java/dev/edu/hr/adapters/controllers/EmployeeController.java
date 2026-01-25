package dev.edu.hr.adapters.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.application.commands.CreateEmployeeCommand;
import dev.edu.hr.application.services.EmployeeOnboardingCommandHandler;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeOnboardingCommandHandler commandHandler;

    @PostMapping("/")
    public ResponseEntity<Void> postMethodName(@Valid @RequestBody CreateEmployeeCommand command) {
        command.accept(commandHandler);
        return ResponseEntity.accepted().build();
    }
}
