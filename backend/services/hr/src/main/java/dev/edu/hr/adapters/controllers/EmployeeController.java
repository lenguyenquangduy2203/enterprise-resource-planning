package dev.edu.hr.adapters.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.adapters.mappers.EmployeeSearchMapper;
import dev.edu.hr.adapters.mappers.StatsMapper;
import dev.edu.hr.adapters.payloads.EmployeeSearchParams;
import dev.edu.hr.adapters.payloads.EmployeeStats;
import dev.edu.hr.adapters.payloads.EmployeeSummary;
import dev.edu.hr.application.commands.CreateEmployeeCommand;
import dev.edu.hr.application.services.EmployeeOnboardingCommandHandler;
import dev.edu.hr.application.services.SearchEmployeeQueryHandler;
import dev.edu.hr.application.services.SimpleEmployeeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeOnboardingCommandHandler commandHandler;
    private final SearchEmployeeQueryHandler searchEmployeeQueryHandler;
    private final EmployeeSearchMapper employeeSearchMapper;
    // private final SimpleEmployeeService employeeService;
    // private final StatsMapper statsMapper;

    @PostMapping
    public ResponseEntity<Void> onboardEmployee(@Valid @RequestBody CreateEmployeeCommand command) {
        command.accept(commandHandler);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeSummary>> searchEmployeeSummaries(
        @ModelAttribute EmployeeSearchParams params,
        @PageableDefault(size = 10) Pageable pageable
    ) {
        var query = employeeSearchMapper.toSearchEmployeeQuery(params, pageable);
        var searchResult = query.accept(searchEmployeeQueryHandler);
        var summaries = employeeSearchMapper.toEmployeeSummaries(searchResult);

        return ResponseEntity.ok(summaries);
    }

    // @GetMapping("/{employeeId}/stats")
    // public ResponseEntity<EmployeeStats> getStats(@PathVariable UUID employeeId) {
    //     var employee = employeeService.getEmployeeById(employeeId);
    //     var stats = statsMapper.toEmployeeStats(employee);

    //     return ResponseEntity.ok(stats);
    // }
}
