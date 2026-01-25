package dev.edu.hr.application.services.impl;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import dev.edu.hr.application.commands.CreateEmployeeCommand;
import dev.edu.hr.application.errors.DepartmentNotFound;
import dev.edu.hr.application.events.EmployeeAccountCreationRequestedEvent;
import dev.edu.hr.application.services.EmployeeOnboardingCommandHandler;
import dev.edu.hr.domain.clients.payloads.DepartmentCode;
import dev.edu.hr.domain.clients.payloads.PositionCode;
import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.repositories.DepartmentRepository;
import dev.edu.hr.domain.repositories.EmployeeRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeOnboardingCommandHandlerImpl implements EmployeeOnboardingCommandHandler {
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    @Transactional
    public void handle(CreateEmployeeCommand command) {
        var department = departmentRepository.findByCode(command.departmentCode())
            .orElseThrow(() -> new DepartmentNotFound(command.departmentCode()));
        var position = department.findPositionByCode(command.positionCode());
        var employee = Employee.onboard(
            command.fullname(), 
            command.email(), 
            command.level(), 
            position);
        var savedEmployee = employeeRepository.save(employee);
        applicationEventPublisher.publishEvent(new EmployeeAccountCreationRequestedEvent(
            savedEmployee.getId(), 
            new DepartmentCode(department.getId(), department.getCode()),
            new PositionCode(position.getId(), position.getCode())));
    }
}
