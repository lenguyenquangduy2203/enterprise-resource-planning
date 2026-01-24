package dev.edu.hr.application.queries;

import java.util.List;

import dev.edu.hr.application.contracts.Query;
import dev.edu.hr.application.results.DepartmentForSelectOption;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;

public record GetAllDepartmentsQuery() implements Query<EmployeeOnboardingQueryHandler, List<DepartmentForSelectOption>> {
    @Override
    public List<DepartmentForSelectOption> accept(EmployeeOnboardingQueryHandler handler) {
        return handler.handle(this);
    }
}
