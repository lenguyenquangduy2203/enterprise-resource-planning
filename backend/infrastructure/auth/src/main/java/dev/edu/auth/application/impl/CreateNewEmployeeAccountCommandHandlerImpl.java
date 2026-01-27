package dev.edu.auth.application.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import dev.edu.auth.application.CreateNewEmployeeAccountCommandHandler;
import dev.edu.auth.application.PrincipalGenerator;
import dev.edu.auth.application.commands.CreateNewEmployeeAccountCommand;
import dev.edu.auth.domain.models.Account;
import dev.edu.auth.infrastructure.persistence.jpa.AccountRepository;
import dev.edu.auth.infrastructure.persistence.jpa.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CreateNewEmployeeAccountCommandHandlerImpl implements CreateNewEmployeeAccountCommandHandler {
    private final PrincipalGenerator principalGenerator;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AccountRepository accountRepository;

    @Transactional
    @Override
    public Long handle(CreateNewEmployeeAccountCommand command) {
        var principal = principalGenerator.generate(
            command.department().code(),
            command.position().code()
        );
        var roles = roleRepository.findAllByPositionId(command.position().id());
        if (roles.isEmpty()) {
            throw new IllegalStateException("No roles assigned to position: %s".formatted(command.position().code()));
        }
        
        var account = new Account();
        account.setUsername(principal.username());
        account.setPassword(passwordEncoder.encode(principal.rawPassword()));
        account.setStatus("ACTIVE");
        account.setEmployeeId(command.employeeId());
        account.getRoles().addAll(roles);

        return accountRepository.save(account).getId();
    }
}
