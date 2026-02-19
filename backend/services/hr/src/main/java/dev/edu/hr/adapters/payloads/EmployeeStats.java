package dev.edu.hr.adapters.payloads;

import java.util.UUID;

import dev.edu.hr.domain.values.AccountProvisioningStatus;

public record EmployeeStats(
    UUID id,
    String name,
    AccountProvisioningStatus provisioningStatus
) {}
