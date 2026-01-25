package dev.edu.hr.application.queries;

import dev.edu.hr.application.contracts.Query;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;
import dev.edu.hr.domain.entities.persistence.Department;

public record GetPositionsInDepartmentByCodeQuery(String code) implements Query<EmployeeOnboardingQueryHandler, Department> {
    @Override
    public Department accept(EmployeeOnboardingQueryHandler handler) {
        return handler.handle(this);
    }
}
