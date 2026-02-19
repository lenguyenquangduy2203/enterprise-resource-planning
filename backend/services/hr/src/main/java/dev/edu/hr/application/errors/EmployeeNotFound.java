package dev.edu.hr.application.errors;

import java.util.UUID;

public class EmployeeNotFound extends RuntimeException {
    public EmployeeNotFound(UUID employeeId) {
        super("Employee not found: " + employeeId);
    }
}
