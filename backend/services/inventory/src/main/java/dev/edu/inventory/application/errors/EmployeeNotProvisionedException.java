package dev.edu.inventory.application.errors;

import java.util.UUID;

public class EmployeeNotProvisionedException extends RuntimeException {
    public EmployeeNotProvisionedException(UUID employeeId) {
        super("Employee is not provisioned: " + employeeId);
    }
}
