package dev.edu.inventory.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import dev.edu.inventory.application.queries.WarehouseLookupQuery;
import dev.edu.inventory.application.services.LookupQueryHandler;
import dev.edu.inventory.domain.repositories.WarehouseRepository;
import dev.edu.inventory.domain.repositories.projections.WarehouseSelection;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class LookupQueryHandlerImpl implements LookupQueryHandler {
    private final WarehouseRepository warehouseRepository;
    
    @Override
    public List<WarehouseSelection> handle(WarehouseLookupQuery query) {
        return warehouseRepository.findAll(WarehouseSelection.class);
    }
}
