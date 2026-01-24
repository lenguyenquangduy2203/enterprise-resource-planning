package dev.edu.hr.application.services;

import java.util.List;

import dev.edu.hr.application.queries.GetAllDepartmentsQuery;
import dev.edu.hr.application.queries.GetPositionsInDepartmentByCodeQuery;
import dev.edu.hr.application.results.DepartmentForSelectOption;
import dev.edu.hr.application.results.PositionForSelectOption;

public interface EmployeeOnboardingQueryHandler {
    List<DepartmentForSelectOption> handle(GetAllDepartmentsQuery query);
    List<PositionForSelectOption> handle(GetPositionsInDepartmentByCodeQuery query);
}
