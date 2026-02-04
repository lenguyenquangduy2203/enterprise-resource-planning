package dev.edu.hr.adapters.payloads;

import dev.edu.hr.domain.values.AccountProvisioningStatus;

public record EmployeeSearchParams(
    String departmentCode,
    String positionCode,
    String level,
    AccountProvisioningStatus accountProvisioningStatus,
    String fullname, // optional, partial
    String email    // optional, exact or prefix
) {}
