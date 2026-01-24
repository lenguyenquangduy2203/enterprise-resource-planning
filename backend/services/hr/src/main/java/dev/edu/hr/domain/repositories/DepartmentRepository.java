package dev.edu.hr.domain.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.hr.domain.entities.persistence.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    /*
     * 1. Find all departments
     *    - positions are NOT fetched (default LAZY)
     */
    @Override
    List<Department> findAll();

    /*
     * 2. Find department by code
     *    - positions are eagerly fetched
     */
    @EntityGraph(attributePaths = "positions")
    Optional<Department> findByCode(String code);
}
