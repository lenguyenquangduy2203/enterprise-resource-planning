package dev.edu.analysis.application.queries;

import java.time.OffsetDateTime;

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
    OffsetDateTime createdFrom,
    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    OffsetDateTime createdTo
) implements Query<StockMovementStatsQueryHandler, MovementStatistics> {
    @Override
    public MovementStatistics accept(StockMovementStatsQueryHandler handler) {
        return handler.handle(this);
    }
}
