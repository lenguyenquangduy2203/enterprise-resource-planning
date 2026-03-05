package dev.edu.hr.adapters.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.adapters.mappers.StatsMapper;
import dev.edu.hr.adapters.payloads.EmployeeStats;
import dev.edu.hr.application.services.SimpleEmployeeService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/stats")
public class StatsController {
    private final SimpleEmployeeService employeeService;
    private final StatsMapper statsMapper;

    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<EmployeeStats> getEmployeeStats(@PathVariable UUID employeeId) {
        var employee = employeeService.getEmployeeById(employeeId);
        var stats = statsMapper.toEmployeeStats(employee);

        return ResponseEntity.ok(stats);
    }
}
