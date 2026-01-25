package dev.edu.hr.application.services.impl;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import dev.edu.hr.application.events.EmployeeAccountCreationRequestedEvent;
import dev.edu.hr.domain.clients.AuthClient;
import dev.edu.hr.domain.clients.payloads.CreateEmployeeAccountRequest;
import dev.edu.hr.domain.repositories.EmployeeRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmployeeAccountCreationRequestedEventHandler {
    private final EmployeeRepository employeeRepository;
    private final AuthClient authClient;

    @Async
    @Transactional
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleEmployeeAccountCreationRequest(EmployeeAccountCreationRequestedEvent event) {
        var employee = employeeRepository.findById(event.employeeId())
            .orElseThrow(() -> new IllegalStateException("Employee not found after onboarding: " + event.employeeId()));
        if (employee.hasAccount()) {
            return; // already processed
        }
        
        var response = authClient.registerEmployeeAccount(new CreateEmployeeAccountRequest(
            event.employeeId(),
            event.department(),
            event.position()));
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new IllegalStateException("Failed to create account for employee " + event.employeeId());
        }

        employee.linkAccount(response.getBody());
        // no explicit save required 
        // JPA dirty checking applies and auto save managed entities
    }
}
