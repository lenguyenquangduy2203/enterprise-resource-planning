package dev.edu.hr.domain.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.repositories.projections.DepartmentWorkforceMetric;

public interface EmployeeRepository extends JpaRepository<Employee, UUID>, JpaSpecificationExecutor<Employee> {
    @Query("""
        SELECT new dev.edu.hr.domain.repositories.projections.DepartmentWorkforceMetric(
            d.code,
            d.name,
            e.level,
            COUNT(e),
            SUM(p.baseWage)
        )
        FROM Employee e
        JOIN e.position p
        JOIN p.department d
        GROUP BY d.code, d.name, e.level
    """)
    List<DepartmentWorkforceMetric> fetchDepartmentWorkforceMetrics();
}
