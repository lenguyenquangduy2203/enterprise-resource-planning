package dev.edu.catalog.adapters.mappers.impl;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import dev.edu.catalog.adapters.mappers.CapitalSnapshotMapper;
import dev.edu.catalog.adapters.payloads.CapitalProductSnapshot;
import dev.edu.catalog.domain.entities.persistence.Product;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CapitalSnapshotMapperImpl implements CapitalSnapshotMapper {
    @Override
    public Set<CapitalProductSnapshot> toCapitalProductSnapshots(Set<Product> products) {
        return products.stream()
            .map(product -> new CapitalProductSnapshot(
                product.getId(), 
                product.getUnitPrice(), 
                product.getCategory().getCode()
            ))
            .collect(Collectors.toSet());
    }
}
