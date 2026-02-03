package dev.edu.hr.adapters.mappers;

import org.springframework.data.domain.Page;

import dev.edu.hr.adapters.payloads.EmployeeSummary;
import dev.edu.hr.domain.entities.persistence.Employee;

public interface EmployeeSearchResultMapper {
    Page<EmployeeSummary> toEmployeeSummaries(Page<Employee> employees);
}
