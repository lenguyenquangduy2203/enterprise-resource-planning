package dev.edu.hr.adapters.mappers.impl;

import java.util.List;
import org.springframework.stereotype.Component;

import dev.edu.hr.adapters.mappers.EmployeeOnboardingResultMapper;
import dev.edu.hr.adapters.payloads.DepartmentSelectOptionResponse;
import dev.edu.hr.adapters.payloads.PositionSelectOptionResponse;
import dev.edu.hr.domain.entities.persistence.Department;

@Component
public class EmployeeOnboardingResultMapperImpl implements EmployeeOnboardingResultMapper {
    @Override
    public List<DepartmentSelectOptionResponse> toDepartmentSelectOptionResponse(List<Department> departments) {
        return departments.stream()
            .map(d -> new DepartmentSelectOptionResponse(
                d.getCode(), 
                d.getName())
            )
            .toList();
    }

    @Override
    public List<PositionSelectOptionResponse> toPositionSelectOptionResponse(Department department) {
        return department.getPositions()
            .stream()
            .map(p -> new PositionSelectOptionResponse(
                p.getCode(), 
                p.getName())
            )
            .toList();
    }
}
