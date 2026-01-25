package dev.edu.hr.application.commands;

import dev.edu.hr.application.contracts.Command;
import dev.edu.hr.application.services.EmployeeOnboardingCommandHandler;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateEmployeeCommand(
    @NotBlank String fullname,
    @NotBlank @Email String email,
    String level,
    @NotBlank String departmentCode,
    @NotBlank String positionCode
) implements Command<EmployeeOnboardingCommandHandler> {
    @Override
    public void accept(EmployeeOnboardingCommandHandler handler) {
        handler.handle(this);
    }
}
