package dev.edu.inventory.application.queries;

import java.time.OffsetDateTime;
import java.util.List;

import dev.edu.inventory.application.contracts.Query;
import dev.edu.inventory.application.services.OperationalKPIQueryHandler;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public record OperationalKPIQuery(
    OffsetDateTime createdFrom,
    OffsetDateTime createdTo
) implements Query<OperationalKPIQueryHandler, List<StockMovement>> {
    @Override
    public List<StockMovement> accept(OperationalKPIQueryHandler handler) {
        return handler.handle(this);
    }
}
