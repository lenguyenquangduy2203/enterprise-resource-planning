package dev.edu.analysis.application.queries;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import dev.edu.analysis.adapters.validations.ValidDateTimePeriod;
import dev.edu.analysis.application.contracts.Query;
import dev.edu.analysis.application.services.StockMovementStatsQueryHandler;
import dev.edu.analysis.domain.clients.payloads.movement.MovementStatistics;
import jakarta.validation.constraints.NotNull;

@ValidDateTimePeriod
public record StockMovementStatsQuery(
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    LocalDateTime createdFrom,
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    LocalDateTime createdTo
) implements Query<StockMovementStatsQueryHandler, MovementStatistics> {
    @Override
    public MovementStatistics accept(StockMovementStatsQueryHandler handler) {
        return handler.handle(this);
    }
}
