package dev.edu.hr.adapters.mappers;

import dev.edu.hr.application.queries.GetAllDepartmentsQuery;
import dev.edu.hr.application.queries.GetPositionsInDepartmentByCodeQuery;

public interface EmployeeOnboardingQueryMapper {
    GetAllDepartmentsQuery toGetAllDepartmentsQuery();
    GetPositionsInDepartmentByCodeQuery toGetPositionsInDepartmentByCodeQuery(String departmentCode);
}
