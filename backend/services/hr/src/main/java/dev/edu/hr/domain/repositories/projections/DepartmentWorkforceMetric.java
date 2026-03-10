package dev.edu.hr.domain.repositories.projections;

import java.math.BigDecimal;

public record DepartmentWorkforceMetric(
    String departmentCode,
    String departmentName,
    String level,
    Long levelCount,
    BigDecimal totalSalaryCost
) {}
