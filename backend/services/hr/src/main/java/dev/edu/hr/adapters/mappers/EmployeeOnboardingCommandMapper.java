package dev.edu.hr.adapters.mappers;

import dev.edu.hr.adapters.payloads.CreateEmployeeRequest;
import dev.edu.hr.application.commands.CreateEmployeeCommand;

public interface EmployeeOnboardingCommandMapper {
    CreateEmployeeCommand toCommand(CreateEmployeeRequest request);
}
