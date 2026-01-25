package dev.edu.hr.adapters.mappers;

import java.util.List;

import dev.edu.hr.adapters.payloads.DepartmentSelectOptionResponse;
import dev.edu.hr.adapters.payloads.PositionSelectOptionResponse;
import dev.edu.hr.domain.entities.persistence.Department;

public interface EmployeeOnboardingResultMapper {
    List<DepartmentSelectOptionResponse> toDepartmentSelectOptionResponse(List<Department> departments);
    List<PositionSelectOptionResponse> toPositionSelectOptionResponse(Department department);
}
