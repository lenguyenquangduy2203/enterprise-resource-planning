package dev.edu.catalog.adapters.mappers;

import java.util.Set;

import dev.edu.catalog.adapters.payloads.CapitalProductSnapshot;
import dev.edu.catalog.domain.entities.persistence.Product;

public interface CapitalSnapshotMapper {
    Set<CapitalProductSnapshot> toCapitalProductSnapshots(Set<Product> products);
}
