package dev.edu.inventory.adapters.mappers.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import dev.edu.inventory.adapters.mappers.CapitalSnapshotMapper;
import dev.edu.inventory.adapters.payloads.CapitalStock;
import dev.edu.inventory.domain.repositories.projections.InStockCapitalSnapshot;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CapitalSnapshotMapperImpl implements CapitalSnapshotMapper {
    @Override
    public Set<CapitalStock> toCapitalStocks(List<InStockCapitalSnapshot> snapshots) {
        return snapshots.stream()
            .map(snapshot -> new CapitalStock(
                snapshot.getId(),
                snapshot.getProductId(),
                snapshot.getQuantity(),
                snapshot.getWarehouseCode()
            ))
            .collect(Collectors.toSet());
    }
}
