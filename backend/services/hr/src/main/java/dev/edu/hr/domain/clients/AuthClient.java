package dev.edu.hr.domain.clients;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;

import dev.edu.hr.domain.clients.payloads.CreateEmployeeAccountRequest;

public interface AuthClient {
    @HttpExchange(method = "POST", url = "/auth/accounts")
    public ResponseEntity<Long> registerEmployeeAccount(@RequestBody CreateEmployeeAccountRequest request);
}
