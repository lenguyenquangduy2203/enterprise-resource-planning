package dev.edu.hr.application.queries;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.edu.hr.application.contracts.Query;
import dev.edu.hr.application.services.SearchEmployeeQueryHandler;
import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.values.AccountProvisioningStatus;

public record SearchEmployeeQuery(
    String departmentCode,
    String positionCode,
    String level,
    AccountProvisioningStatus accountProvisioningStatus,
    String fullname, // optional, partial
    String email,    // optional, exact or prefix
    Pageable pageable
) implements Query<SearchEmployeeQueryHandler, Page<Employee>> {

    @Override
    public Page<Employee> accept(SearchEmployeeQueryHandler handler) {
        return handler.handle(this);
    }

}
