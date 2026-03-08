package dev.edu.analysis.application.services.impl;

import org.springframework.stereotype.Component;

import dev.edu.analysis.application.errors.EmptyAggregationException;
import dev.edu.analysis.application.errors.OperationalKPIAggregationException;
import dev.edu.analysis.application.queries.StockMovementStatsQuery;
import dev.edu.analysis.application.services.StockMovementStatsQueryHandler;
import dev.edu.analysis.domain.clients.InvClient;
import dev.edu.analysis.domain.clients.payloads.movement.MovementStatistics;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class StockMovementStatsQueryHandlerImpl implements StockMovementStatsQueryHandler {
    private final InvClient invClient;

    @Override
    public MovementStatistics handle(StockMovementStatsQuery query) {
        var resp = invClient.fetchOperationalKPI(query.createdFrom(), query.createdTo());
        var status = resp.getStatusCode();
        if (!status.is2xxSuccessful()) {
            throw new OperationalKPIAggregationException(status.value());
        }

        if (!resp.hasBody()) {
            throw new EmptyAggregationException(status.value());
        }

        return resp.getBody();
    }
}
