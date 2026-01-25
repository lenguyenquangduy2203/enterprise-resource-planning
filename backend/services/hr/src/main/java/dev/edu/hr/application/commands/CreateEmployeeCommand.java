package dev.edu.hr.application.commands;

import dev.edu.hr.application.contracts.Command;
import dev.edu.hr.application.services.EmployeeOnboardingCommandHandler;

public record CreateEmployeeCommand(
    String fullname,
    String email,
    String level,
    String departmentCode,
    String positionCode
) implements Command<EmployeeOnboardingCommandHandler> {
    @Override
    public void accept(EmployeeOnboardingCommandHandler handler) {
        handler.handle(this);
    }
}
