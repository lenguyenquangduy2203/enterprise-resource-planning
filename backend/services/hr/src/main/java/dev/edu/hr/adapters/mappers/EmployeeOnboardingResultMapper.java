package dev.edu.hr.adapters.mappers;

import java.util.List;

import dev.edu.hr.adapters.payloads.DepartmentSelectOptionResponse;
import dev.edu.hr.adapters.payloads.PositionSelectOptionResponse;
import dev.edu.hr.application.results.DepartmentForSelectOption;
import dev.edu.hr.application.results.PositionForSelectOption;

public interface EmployeeOnboardingResultMapper {
    DepartmentSelectOptionResponse toResponse(DepartmentForSelectOption result);
    PositionSelectOptionResponse toResponse(PositionForSelectOption result);
    List<DepartmentSelectOptionResponse> toDepartmentResponses(List<DepartmentForSelectOption> results);
    List<PositionSelectOptionResponse> toPositionResponses(List<PositionForSelectOption> results);
}
