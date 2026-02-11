package dev.edu.catalog.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.catalog.domain.entities.persistence.Manufacturer;

public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {

}
