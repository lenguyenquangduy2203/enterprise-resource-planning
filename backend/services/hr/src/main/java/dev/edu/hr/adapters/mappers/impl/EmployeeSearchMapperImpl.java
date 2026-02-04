package dev.edu.hr.adapters.mappers.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import dev.edu.hr.adapters.mappers.EmployeeSearchMapper;
import dev.edu.hr.adapters.payloads.EmployeeSearchParams;
import dev.edu.hr.adapters.payloads.EmployeeSummary;
import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.domain.entities.persistence.Employee;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmployeeSearchMapperImpl implements EmployeeSearchMapper {@Override
    public Page<EmployeeSummary> toEmployeeSummaries(Page<Employee> employees) {
        return employees.map(this::map);
    }

    public SearchEmployeeQuery toSearchEmployeeQuery(EmployeeSearchParams params, Pageable pageable) {
        return new SearchEmployeeQuery(
            params.departmentCode(), 
            params.positionCode(), 
            params.level(), 
            params.accountProvisioningStatus(), 
            params.fullname(), 
            params.email(), 
            pageable);
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
