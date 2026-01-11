package dev.edu.auth.application.impl;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dev.edu.auth.infrastructure.persistence.jpa.AccountRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var account = accountRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));
        
        return User.builder()
            .username(account.getUsername())
            .password(account.getPassword())
            .disabled(!account.isActive())
            .authorities(
                account.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getCode()))
                    .toList()
            )
            .build();
    }
}
