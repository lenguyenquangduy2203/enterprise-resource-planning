package dev.edu.hr.application.services;

import org.springframework.data.domain.Page;

import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.domain.entities.persistence.Employee;

public interface SearchEmployeeQueryHandler {
    Page<Employee> handle(SearchEmployeeQuery query);
}
