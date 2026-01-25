package dev.edu.hr.adapters.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.adapters.mappers.EmployeeOnboardingResultMapper;
import dev.edu.hr.adapters.payloads.DepartmentSelectOptionResponse;
import dev.edu.hr.adapters.payloads.PositionSelectOptionResponse;
import dev.edu.hr.application.queries.GetAllDepartmentsQuery;
import dev.edu.hr.application.queries.GetPositionsInDepartmentByCodeQuery;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@AllArgsConstructor
@RequestMapping("/departments")
public class DepartmentController {
    private final EmployeeOnboardingQueryHandler queryHandler;
    private final EmployeeOnboardingResultMapper resultMapper;

    @GetMapping
    public ResponseEntity<List<DepartmentSelectOptionResponse>> getDepartmentSelections() {
        var result = queryHandler.handle(new GetAllDepartmentsQuery());
        var response = resultMapper.toDepartmentSelectOptionResponse(result);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{code}/positions")
    public ResponseEntity<List<PositionSelectOptionResponse>> getPositionSelection(@PathVariable String code) {
        var result = queryHandler.handle(new GetPositionsInDepartmentByCodeQuery(code));
        var response = resultMapper.toPositionSelectOptionResponse(result);

        return ResponseEntity.ok(response);
    }
}
