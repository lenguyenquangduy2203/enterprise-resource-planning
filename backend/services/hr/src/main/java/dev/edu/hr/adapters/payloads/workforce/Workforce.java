package dev.edu.hr.adapters.payloads.workforce;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import dev.edu.hr.domain.repositories.projections.DepartmentWorkforceMetric;

public record Workforce(
    Set<DepartmentStructure> departments
) {
    public static Workforce from(List<DepartmentWorkforceMetric> metrics) {
        Map<String, List<DepartmentWorkforceMetric>> grouped = metrics.stream()
            .collect(Collectors.groupingBy(DepartmentWorkforceMetric::departmentCode));
        Set<DepartmentStructure> departments = grouped.values()
            .stream()
            .map(DepartmentStructure::from)
            .collect(Collectors.toSet());

        return new Workforce(departments);
    }
}
