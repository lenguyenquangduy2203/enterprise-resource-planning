package dev.edu.hr.adapters.mappers.impl;

import java.util.List;
import org.springframework.stereotype.Component;

import dev.edu.hr.adapters.mappers.EmployeeOnboardingResultMapper;
import dev.edu.hr.adapters.payloads.DepartmentSelectOption;
import dev.edu.hr.adapters.payloads.PositionSelectOption;
import dev.edu.hr.domain.entities.persistence.Department;

@Component
public class EmployeeOnboardingResultMapperImpl implements EmployeeOnboardingResultMapper {
    @Override
    public List<DepartmentSelectOption> toDepartmentSelectOptionsResponse(List<Department> departments) {
        return departments.stream()
            .map(d -> new DepartmentSelectOption(
                d.getCode(), 
                d.getName())
            )
            .toList();
    }

    @Override
    public List<PositionSelectOption> toPositionSelectOptionsResponse(Department department) {
        return department.getPositions()
            .stream()
            .map(p -> new PositionSelectOption(
                p.getCode(), 
                p.getName())
            )
            .toList();
    }
}
