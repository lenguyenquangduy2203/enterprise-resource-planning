package dev.edu.auth.infrastructure.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.auth.application.CreateNewEmployeeAccountCommandHandler;
import dev.edu.auth.application.commands.CreateNewEmployeeAccountCommand;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/accounts")
@AllArgsConstructor
public class AccountController {
    private final CreateNewEmployeeAccountCommandHandler createNewEmployeeAccountCommandHandler;

    @PostMapping
    public ResponseEntity<Long> postMethodName(@RequestBody CreateNewEmployeeAccountCommand command) {
        var accountId = command.accept(createNewEmployeeAccountCommandHandler);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(accountId);
    }
    
}
