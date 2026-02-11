package dev.edu.catalog.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.catalog.domain.entities.persistence.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
