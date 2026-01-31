package dev.edu.auth.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import dev.edu.auth.domain.models.PrincipalCounter;
import dev.edu.auth.domain.models.PrincipalCounterId;
import jakarta.persistence.LockModeType;

public interface PrincipalCounterRepository extends JpaRepository<PrincipalCounter, PrincipalCounterId>{
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<PrincipalCounter> findById(PrincipalCounterId id);
}
