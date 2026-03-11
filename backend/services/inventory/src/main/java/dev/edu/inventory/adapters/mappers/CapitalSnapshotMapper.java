package dev.edu.inventory.adapters.mappers;

import java.util.List;
import java.util.Set;

import dev.edu.inventory.adapters.payloads.CapitalStock;
import dev.edu.inventory.domain.repositories.projections.InStockCapitalSnapshot;

public interface CapitalSnapshotMapper {
    Set<CapitalStock> toCapitalStocks(List<InStockCapitalSnapshot> snapshots);
}
