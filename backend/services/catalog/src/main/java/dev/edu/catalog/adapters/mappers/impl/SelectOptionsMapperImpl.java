package dev.edu.catalog.adapters.mappers.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import dev.edu.catalog.adapters.mappers.SelectOptionsMapper;
import dev.edu.catalog.adapters.payloads.CategoryOptionResponse;
import dev.edu.catalog.adapters.payloads.ManufacturerOptionResponse;
import dev.edu.catalog.domain.entities.persistence.Category;
import dev.edu.catalog.domain.entities.persistence.Manufacturer;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SelectOptionsMapperImpl implements SelectOptionsMapper {
    @Override
    public List<CategoryOptionResponse> toCategoryOptionResponse(List<Category> categories) {
        return categories.stream()
            .map(category -> new CategoryOptionResponse(category.getCode(), category.getName()))
            .toList();
    }

    @Override
    public List<ManufacturerOptionResponse> toManufacturerOptionResponse(List<Manufacturer> manufacturers) {
        return manufacturers.stream()
            .map(manufacturer -> new ManufacturerOptionResponse(manufacturer.getCode(), manufacturer.getName()))
            .toList();
    }
}
