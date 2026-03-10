package dev.edu.analysis.domain.clients.payloads.workforce;

import java.math.BigDecimal;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DepartmentStructure(
    @NotNull @NotBlank String departmentCode,
    @NotNull @NotBlank String departmentName,
    @NotNull @Positive Long totalEmployee,
    @NotNull @Positive BigDecimal totalSalaryCost,
    @NotNull Set<LevelCount> levelDistributions
) {}
