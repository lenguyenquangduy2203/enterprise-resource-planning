package dev.edu.inventory.application.queries;

import java.util.List;

import dev.edu.inventory.application.contracts.Query;
import dev.edu.inventory.application.services.LookupQueryHandler;
import dev.edu.inventory.domain.repositories.projections.WarehouseSelection;

public record WarehouseLookupQuery() implements Query<LookupQueryHandler, List<WarehouseSelection>> {
    @Override
    public List<WarehouseSelection> accept(LookupQueryHandler handler) {
        return handler.handle(this);
    }
}
