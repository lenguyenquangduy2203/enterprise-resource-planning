package dev.edu.inventory.adapters.mappers.impl;

import org.springframework.stereotype.Component;

import dev.edu.inventory.adapters.mappers.StockMovementRequestMapper;
import dev.edu.inventory.adapters.payloads.MovementRequestStatus;
import dev.edu.inventory.domain.entities.persistence.StockMovement;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class StockMovementRequestMapperImpl implements StockMovementRequestMapper {
    @Override
    public MovementRequestStatus toMovementRequestStatus(StockMovement movement) {
        return new MovementRequestStatus(movement.getId(), movement.getStatus());
    }
}
