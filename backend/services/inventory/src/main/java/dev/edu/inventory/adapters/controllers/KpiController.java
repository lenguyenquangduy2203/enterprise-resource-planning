package dev.edu.inventory.adapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.inventory.adapters.payloads.kpi.MovementStatistics;
import dev.edu.inventory.adapters.payloads.kpi.OperationalKPISearchParams;
import dev.edu.inventory.application.queries.OperationalKPIQuery;
import dev.edu.inventory.application.services.OperationalKPIQueryHandler;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/kpi")
public class KpiController {
    private final OperationalKPIQueryHandler operationalKPIQueryHandler;

    @GetMapping
    public ResponseEntity<MovementStatistics> fetchOperationalKPI(@Valid @ModelAttribute OperationalKPISearchParams params) {
        var query = new OperationalKPIQuery(params.createdFrom(), params.createdTo());
        var movements = query.accept(operationalKPIQueryHandler);
        var statistics = MovementStatistics.from(movements);

        return ResponseEntity.ok(statistics);
    }
}
