package dev.edu.inventory.adapters.payloads.snapshots;

import java.util.UUID;

public record EmployeeSnapshot(
    UUID id,
    String name
) {}
