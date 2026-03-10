package dev.edu.hr.application.services;

import java.util.List;

import dev.edu.hr.domain.repositories.projections.DepartmentWorkforceMetric;

public interface WorkforceAggregatingService {
    List<DepartmentWorkforceMetric> aggregateWorkforceMetrics();
}
