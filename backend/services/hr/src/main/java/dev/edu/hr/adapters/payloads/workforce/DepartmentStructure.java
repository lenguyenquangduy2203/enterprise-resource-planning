package dev.edu.hr.adapters.payloads.workforce;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import dev.edu.hr.domain.repositories.projections.DepartmentWorkforceMetric;

public record DepartmentStructure(
    String departmentCode,
    String departmentName,
    Long totalEmployee,
    BigDecimal totalSalaryCost,
    Set<LevelCount> levelDistributions
) {
    public static DepartmentStructure from(List<DepartmentWorkforceMetric> metrics) {
        var first = metrics.get(0);
        Long totalEmployee = 0L;
        BigDecimal totalSalaryCost = BigDecimal.ZERO;
        Set<LevelCount> levelDistributions = new HashSet<>();

        for (DepartmentWorkforceMetric metric : metrics) {
            var levelCount = new LevelCount(metric.level(), metric.levelCount());
            
            totalEmployee += levelCount.total();
            totalSalaryCost.add(metric.totalSalaryCost());
            levelDistributions.add(levelCount);
        }
        
        return new DepartmentStructure(
            first.departmentCode(),
            first.departmentName(),
            totalEmployee,
            totalSalaryCost,
            levelDistributions
        );
    }
}
