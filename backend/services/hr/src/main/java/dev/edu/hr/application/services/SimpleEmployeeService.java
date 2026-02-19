package dev.edu.hr.application.services;

import java.util.UUID;

import dev.edu.hr.domain.entities.persistence.Employee;

public interface SimpleEmployeeService {
    Employee getEmployeeById(UUID employeeId);
}
