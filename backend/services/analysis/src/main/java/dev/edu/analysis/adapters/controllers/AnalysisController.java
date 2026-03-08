package dev.edu.analysis.adapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.analysis.application.queries.OrganizationStructureQuery;
import dev.edu.analysis.application.queries.StockMovementStatsQuery;
import dev.edu.analysis.application.results.CapitalDistributionResult;
import dev.edu.analysis.application.services.CapitalDistributionQueryHandler;
import dev.edu.analysis.application.services.OrganizationStructureQueryHandler;
import dev.edu.analysis.application.services.StockMovementStatsQueryHandler;
import dev.edu.analysis.application.services.impl.CapitalDistributionQueryResolver;
import dev.edu.analysis.domain.clients.payloads.movement.MovementStatistics;
import dev.edu.analysis.domain.clients.payloads.workforce.Workforce;
import dev.edu.analysis.domain.values.GroupBy;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AnalysisController {
    private final OrganizationStructureQueryHandler organizationStructureQueryHandler;
    private final StockMovementStatsQueryHandler stockMovementStatsQueryHandler;
    private final CapitalDistributionQueryResolver capitalDistributionQueryResolver;
    private final CapitalDistributionQueryHandler capitalDistributionQueryHandler;

    @GetMapping("/workforce")
    public ResponseEntity<Workforce> getDepartmentsWorkforce() {
        var workforce = new OrganizationStructureQuery().accept(organizationStructureQueryHandler);
        return ResponseEntity.ok(workforce);
    }

    @GetMapping("/kpi")
    public ResponseEntity<MovementStatistics> getOperationKPI(@Valid @ModelAttribute StockMovementStatsQuery query) {
        var statistics = query.accept(stockMovementStatsQueryHandler);
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/capital")
    public ResponseEntity<CapitalDistributionResult> getStockCapitalDistribution(@RequestParam GroupBy groupBy) {
        var query = capitalDistributionQueryResolver.resolve(groupBy);
        var result = query.accept(capitalDistributionQueryHandler);

        return ResponseEntity.ok(result);
    }
}
