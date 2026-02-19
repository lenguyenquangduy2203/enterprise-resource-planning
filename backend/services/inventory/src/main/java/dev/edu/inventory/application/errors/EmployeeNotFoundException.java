package dev.edu.inventory.application.errors;

import java.util.UUID;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(UUID employeeId) {
        super("Employee not found: " + employeeId);
    }
}
