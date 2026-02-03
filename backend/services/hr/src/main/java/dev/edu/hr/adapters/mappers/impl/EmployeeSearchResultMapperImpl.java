package dev.edu.hr.adapters.mappers.impl;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import dev.edu.hr.adapters.mappers.EmployeeSearchResultMapper;
import dev.edu.hr.adapters.payloads.EmployeeSummary;
import dev.edu.hr.domain.entities.persistence.Employee;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmployeeSearchResultMapperImpl implements EmployeeSearchResultMapper {@Override
    public Page<EmployeeSummary> toEmployeeSummaries(Page<Employee> employees) {
        return employees.map(this::map);
    }
    
    private EmployeeSummary map(Employee e) {
        var position = e.getPosition();
        var department = position.getDepartment();

        return new EmployeeSummary(
            e.getId(),
            e.getFullname(),
            e.getEmail(),
            e.getLevel(),
            position.getCode(),
            position.getName(),
            department.getCode(),
            department.getName(),
            e.hasAccount()
        );
    }
}
