package dev.edu.auth.application.commands;

import java.util.UUID;

import dev.edu.auth.application.CreateNewEmployeeAccountCommandHandler;
import dev.edu.auth.application.contracts.Command;
import dev.edu.auth.domain.values.DepartmentCode;
import dev.edu.auth.domain.values.PositionCode;

public record CreateNewEmployeeAccountCommand(
    UUID employeeId,
    DepartmentCode department,
    PositionCode position
) implements Command<CreateNewEmployeeAccountCommandHandler, Long> {
    @Override
    public Long accept(CreateNewEmployeeAccountCommandHandler handler) {
        return handler.handle(this);
    }
}
