package dev.edu.hr.application.services;

import java.util.List;

import dev.edu.hr.application.queries.GetAllDepartmentsQuery;
import dev.edu.hr.application.queries.GetPositionsInDepartmentByCodeQuery;
import dev.edu.hr.domain.entities.persistence.Department;

public interface EmployeeOnboardingQueryHandler {
    List<Department> handle(GetAllDepartmentsQuery query);
    Department handle(GetPositionsInDepartmentByCodeQuery query);
}
