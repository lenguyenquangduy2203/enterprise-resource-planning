package dev.edu.inventory.domain.clients.payloads;

import java.util.UUID;

import dev.edu.inventory.domain.values.EmployeeProvisioningStatus;

public record EmployeeStats(
    UUID id,
    String name,
    EmployeeProvisioningStatus provisioningStatus
) {}
