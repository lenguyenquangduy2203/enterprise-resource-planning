package dev.edu.hr.application.services.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import dev.edu.hr.application.errors.EmployeeNotFound;
import dev.edu.hr.application.services.SimpleEmployeeService;
import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.repositories.EmployeeRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SimpleEmployeeServiceImpl implements SimpleEmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public Employee getEmployeeById(UUID employeeId) {
        return employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFound(employeeId));
    }
}
