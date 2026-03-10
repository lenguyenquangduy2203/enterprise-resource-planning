package dev.edu.analysis.domain.clients.payloads.workforce;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

public record Workforce(
    @NotNull Set<DepartmentStructure> departments
) {}
