package dev.edu.hr.domain.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.edu.hr.domain.entities.persistence.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

}
