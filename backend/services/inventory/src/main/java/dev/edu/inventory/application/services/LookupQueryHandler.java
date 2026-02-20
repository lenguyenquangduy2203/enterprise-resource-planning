package dev.edu.inventory.application.services;

import java.util.List;

import dev.edu.inventory.application.queries.WarehouseLookupQuery;
import dev.edu.inventory.domain.repositories.projections.WarehouseSelection;

public interface LookupQueryHandler {
    List<WarehouseSelection> handle(WarehouseLookupQuery query);
}
