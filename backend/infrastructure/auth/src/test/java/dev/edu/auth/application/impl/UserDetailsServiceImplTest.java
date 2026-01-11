package dev.edu.auth.application.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import dev.edu.auth.domain.models.Account;
import dev.edu.auth.domain.models.Role;
import dev.edu.auth.infrastructure.persistence.jpa.AccountRepository;

@ExtendWith(MockitoExtension.class)
class UserDetailsServiceImplTest {
    @Mock
    AccountRepository accountRepository;
    @InjectMocks
    UserDetailsServiceImpl userDetailsService;

    @Test
    void loadUser_success() {
        var account = new Account();
        account.setUsername("duy");
        account.setPassword("$2a$10$hash");
        account.setStatus("ACTIVE");

        var role = new Role();
        role.setCode("ADMIN");
        account.setRoles(Set.of(role));

        when(accountRepository.findByUsername(account.getUsername()))
            .thenReturn(Optional.of(account));

        UserDetails user = userDetailsService.loadUserByUsername(account.getUsername());

        assertEquals(account.getUsername(), user.getUsername());
        assertTrue(user.isEnabled());

        boolean hasAdminRole = user.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .anyMatch(a -> a.equals("ROLE_ADMIN"));

        assertTrue(hasAdminRole);
    }

    @Test
    void loadUser_disabledAccount() {
        var account = new Account();
        account.setUsername("duy");
        account.setPassword("hash");
        account.setStatus("DISABLED");

        when(accountRepository.findByUsername(account.getUsername()))
            .thenReturn(Optional.of(account));

        UserDetails user = userDetailsService.loadUserByUsername(account.getUsername());

        assertFalse(user.isEnabled());
    }

    @Test
    void loadUser_notFound() {
        when(accountRepository.findByUsername("x"))
            .thenReturn(Optional.empty());

        assertThrows(
            UsernameNotFoundException.class,
            () -> userDetailsService.loadUserByUsername("x")
        );
    }
}
