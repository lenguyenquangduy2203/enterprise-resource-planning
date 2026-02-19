package dev.edu.inventory.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.inventory.domain.entities.persistence.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

}
