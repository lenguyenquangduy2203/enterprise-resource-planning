package dev.edu.hr.adapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.hr.adapters.payloads.workforce.Workforce;
import dev.edu.hr.application.services.WorkforceAggregatingService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/workforce")
public class WorkforceController {
    private final WorkforceAggregatingService workforceAggregatingService;

    @GetMapping
    public ResponseEntity<Workforce> fetchDepartmentWorkforce() {
        var metrics = workforceAggregatingService.aggregateWorkforceMetrics();
        var workforce = Workforce.from(metrics);

        return ResponseEntity.ok(workforce);
    }
}
