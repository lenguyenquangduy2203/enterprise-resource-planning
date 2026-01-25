package dev.edu.hr.adapters.mappers;

import java.util.List;

import dev.edu.hr.adapters.payloads.DepartmentSelectOption;
import dev.edu.hr.adapters.payloads.PositionSelectOption;
import dev.edu.hr.domain.entities.persistence.Department;

public interface EmployeeOnboardingResultMapper {
    List<DepartmentSelectOption> toDepartmentSelectOptionsResponse(List<Department> departments);
    List<PositionSelectOption> toPositionSelectOptionsResponse(Department department);
}
