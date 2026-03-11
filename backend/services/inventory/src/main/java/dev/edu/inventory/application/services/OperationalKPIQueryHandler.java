package dev.edu.inventory.application.services;

import java.util.List;

import dev.edu.inventory.application.queries.OperationalKPIQuery;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface OperationalKPIQueryHandler {
    List<StockMovement> handle(OperationalKPIQuery query);
}
