package dev.edu.inventory.domain.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long>, JpaSpecificationExecutor<StockMovement> {
    List<StockMovement> findByCreatedAtBetween(Instant from, Instant to);
}
