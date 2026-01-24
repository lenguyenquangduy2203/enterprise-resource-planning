package dev.edu.hr.application.queries;

import java.util.List;

import dev.edu.hr.application.contracts.Query;
import dev.edu.hr.application.results.PositionForSelectOption;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;

public record GetPositionsInDepartmentByCodeQuery(String code) implements Query<EmployeeOnboardingQueryHandler, List<PositionForSelectOption>> {
    @Override
    public List<PositionForSelectOption> accept(EmployeeOnboardingQueryHandler handler) {
        return handler.handle(this);
    }
}
