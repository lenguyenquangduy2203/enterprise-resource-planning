package dev.edu.analysis.application.services;

import dev.edu.analysis.application.queries.StockMovementStatsQuery;
import dev.edu.analysis.domain.clients.payloads.movement.MovementStatistics;

public interface StockMovementStatsQueryHandler {
    MovementStatistics handle(StockMovementStatsQuery query);
}
