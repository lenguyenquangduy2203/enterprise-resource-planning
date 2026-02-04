package dev.edu.hr.adapters.mappers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.hr.adapters.payloads.EmployeeSearchParams;
import dev.edu.hr.adapters.payloads.EmployeeSummary;
import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.domain.entities.persistence.Employee;

public interface EmployeeSearchMapper {
    Page<EmployeeSummary> toEmployeeSummaries(Page<Employee> employees);
    SearchEmployeeQuery toSearchEmployeeQuery(EmployeeSearchParams params, Pageable pageable);
}
