package dev.edu.inventory.domain.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.inventory.domain.entities.persistence.Warehouse;
import dev.edu.inventory.domain.repositories.projections.WarehouseSelection;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<WarehouseSelection> findAll(Class<WarehouseSelection> type);
}
