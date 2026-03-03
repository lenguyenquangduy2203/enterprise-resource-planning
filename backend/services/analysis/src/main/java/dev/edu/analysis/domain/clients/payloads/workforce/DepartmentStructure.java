package dev.edu.analysis.domain.clients.payloads.workforce;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record DepartmentStructure(
    @NotNull @NotBlank String departmentCode,
    @NotNull @NotBlank String departmentName,
    @NotNull @PositiveOrZero Integer totalEmployee,
    @NotNull @PositiveOrZero BigDecimal totalSalaryCost
) {}
