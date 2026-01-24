package dev.edu.hr.application.services;

import dev.edu.hr.application.commands.CreateEmployeeCommand;

public interface EmployeeOnboardingCommandHandler {
    void handle(CreateEmployeeCommand command);
}
