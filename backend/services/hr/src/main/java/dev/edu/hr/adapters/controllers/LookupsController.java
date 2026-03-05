package dev.edu.hr.adapters.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.adapters.mappers.EmployeeOnboardingResultMapper;
import dev.edu.hr.adapters.payloads.DepartmentSelectOption;
import dev.edu.hr.adapters.payloads.PositionSelectOption;
import dev.edu.hr.application.queries.GetAllDepartmentsQuery;
import dev.edu.hr.application.queries.GetPositionsInDepartmentByCodeQuery;
import dev.edu.hr.application.services.EmployeeOnboardingQueryHandler;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/lookups")
public class LookupsController {
    private final EmployeeOnboardingQueryHandler queryHandler;
    private final EmployeeOnboardingResultMapper resultMapper;

    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentSelectOption>> getDepartmentSelections() {
        var result = new GetAllDepartmentsQuery().accept(queryHandler);
        var response = resultMapper.toDepartmentSelectOptionsResponse(result);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/departments/{code}/positions")
    public ResponseEntity<List<PositionSelectOption>> getPositionSelection(@PathVariable String code) {
        var result = new GetPositionsInDepartmentByCodeQuery(code).accept(queryHandler);
        var response = resultMapper.toPositionSelectOptionsResponse(result);
        
        return ResponseEntity.ok(response);
    }
}
