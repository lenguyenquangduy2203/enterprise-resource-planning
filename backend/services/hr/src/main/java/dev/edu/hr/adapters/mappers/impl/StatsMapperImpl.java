package dev.edu.hr.adapters.mappers.impl;

import org.springframework.stereotype.Component;

import dev.edu.hr.adapters.mappers.StatsMapper;
import dev.edu.hr.adapters.payloads.EmployeeStats;
import dev.edu.hr.domain.entities.persistence.Employee;
import dev.edu.hr.domain.values.AccountProvisioningStatus;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class StatsMapperImpl implements StatsMapper {
    @Override
    public EmployeeStats toEmployeeStats(Employee employee) {
        return new EmployeeStats(
            employee.getId(),
            employee.getFullname(),
            getProvisioningStatus(employee)
        );
    }

    private AccountProvisioningStatus getProvisioningStatus(Employee employee) {
        return employee.hasAccount()
            ? AccountProvisioningStatus.PROVISIONED
            : AccountProvisioningStatus.NOT_PROVISIONED;
    }
}
