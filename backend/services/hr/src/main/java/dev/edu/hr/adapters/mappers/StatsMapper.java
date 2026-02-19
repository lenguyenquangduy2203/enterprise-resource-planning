package dev.edu.hr.adapters.mappers;

import dev.edu.hr.adapters.payloads.EmployeeStats;
import dev.edu.hr.domain.entities.persistence.Employee;

public interface StatsMapper {
    EmployeeStats toEmployeeStats(Employee employee);
}
