package dev.edu.auth.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.auth.domain.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findAllByPositionId(Long positionId);
}
