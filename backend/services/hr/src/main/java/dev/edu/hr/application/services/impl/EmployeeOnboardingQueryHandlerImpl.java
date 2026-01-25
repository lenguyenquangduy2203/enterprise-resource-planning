package dev.edu.hr.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.edu.hr.application.errors.DepartmentNotFound;
import dev.edu.hr.application.queries.GetAllDepartmentsQuery;
import dev.edu.hr.application.queries.GetPositionsInDepartmentByCodeQuery;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;
import dev.edu.hr.domain.entities.persistence.Department;
import dev.edu.hr.domain.repositories.DepartmentRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeOnboardingQueryHandlerImpl implements EmployeeOnboardingQueryHandler {
    private final DepartmentRepository departmentRepository;

    @Override
    public List<Department> handle(GetAllDepartmentsQuery query) {
        return departmentRepository.findAll();
    }

    @Override
    public Department handle(GetPositionsInDepartmentByCodeQuery query) {
        return departmentRepository.findByCode(query.code())
            .orElseThrow(() -> new DepartmentNotFound(query.code()));
    }
}
