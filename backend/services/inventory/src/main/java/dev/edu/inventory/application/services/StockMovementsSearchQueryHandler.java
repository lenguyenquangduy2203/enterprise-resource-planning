package dev.edu.inventory.application.services;

import org.springframework.data.domain.Page;

import dev.edu.inventory.application.queries.StockMovementsSearchQuery;
import dev.edu.inventory.domain.entities.persistence.StockMovement;

public interface StockMovementsSearchQueryHandler {
    Page<StockMovement> handle(StockMovementsSearchQuery query);
}
