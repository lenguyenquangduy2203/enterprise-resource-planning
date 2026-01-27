package dev.edu.auth.application;

import dev.edu.auth.application.commands.CreateNewEmployeeAccountCommand;

public interface CreateNewEmployeeAccountCommandHandler {
    Long handle(CreateNewEmployeeAccountCommand command);
}
