package dev.edu.hr.application.services.impl;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.application.queries.specs.EmployeeSpecifications;
import dev.edu.hr.application.services.SearchEmployeeQueryHandler;
import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.repositories.EmployeeRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SearchEmployeeQueryHandlerImpl implements SearchEmployeeQueryHandler {
    private final EmployeeRepository employeeRepository;

    @Override
    public Page<Employee> handle(SearchEmployeeQuery query) {
        return employeeRepository.findAll(EmployeeSpecifications.from(query), query.pageable());
    }
}
