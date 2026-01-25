package dev.edu.hr.application.queries;

import java.util.List;

import dev.edu.hr.application.contracts.Query;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;
import dev.edu.hr.domain.entities.persistence.Department;

public record GetAllDepartmentsQuery() implements Query<EmployeeOnboardingQueryHandler, List<Department>> {
    @Override
    public List<Department> accept(EmployeeOnboardingQueryHandler handler) {
        return handler.handle(this);
    }
}
