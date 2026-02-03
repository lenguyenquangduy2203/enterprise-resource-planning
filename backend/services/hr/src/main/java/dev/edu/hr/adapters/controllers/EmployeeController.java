package dev.edu.hr.adapters.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.adapters.mappers.EmployeeSearchResultMapper;
import dev.edu.hr.adapters.payloads.EmployeeSummary;
import dev.edu.hr.application.commands.CreateEmployeeCommand;
import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.application.services.EmployeeOnboardingCommandHandler;
import dev.edu.hr.application.services.SearchEmployeeQueryHandler;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeOnboardingCommandHandler commandHandler;
    private final SearchEmployeeQueryHandler searchEmployeeQueryHandler;
    private final EmployeeSearchResultMapper employeeSearchResultMapper;

    @PostMapping
    public ResponseEntity<Void> onboardEmployee(@Valid @RequestBody CreateEmployeeCommand command) {
        command.accept(commandHandler);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeSummary>> searchEmployeeSummaries(
        @PageableDefault(
            page = 0,
            size = 20,
            sort = "fullname",
            direction = Direction.ASC
        )
        @ModelAttribute SearchEmployeeQuery query
    ) {
        var searchResult = query.accept(searchEmployeeQueryHandler);
        var summaries = employeeSearchResultMapper.toEmployeeSummaries(searchResult);

        return ResponseEntity.ok(summaries);
    }
}
