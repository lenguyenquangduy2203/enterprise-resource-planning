package dev.edu.hr.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.edu.hr.application.services.WorkforceAggregatingService;
import dev.edu.hr.domain.repositories.EmployeeRepository;
import dev.edu.hr.domain.repositories.projections.DepartmentWorkforceMetric;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WorkforceAggregatingServiceImpl implements WorkforceAggregatingService {
    private final EmployeeRepository employeeRepository;
    
    @Override
    public List<DepartmentWorkforceMetric> aggregateWorkforceMetrics() {
        return employeeRepository.fetchDepartmentWorkforceMetrics();
    }
}
