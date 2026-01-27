package dev.edu.auth.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.edu.auth.domain.models.PrincipalCounter;
import dev.edu.auth.domain.models.PrincipalCounterId;
import jakarta.persistence.LockModeType;

public interface PrincipalCounterRepository extends JpaRepository<PrincipalCounter, PrincipalCounterId>{
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        select pc
        from PrincipalCounter pc
        where pc.id.departmentCode = :department
            and pc.id.positionCode = :position
    """)
    Optional<PrincipalCounter> lockForUpdate(
        @Param("department") String departmentCode,
        @Param("position") String positionCode
    );
}
