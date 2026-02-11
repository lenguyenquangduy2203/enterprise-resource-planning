package dev.edu.catalog.adapters.mappers;

import java.util.List;

import dev.edu.catalog.adapters.payloads.CategoryOptionResponse;
import dev.edu.catalog.adapters.payloads.ManufacturerOptionResponse;
import dev.edu.catalog.domain.entities.persistence.Category;
import dev.edu.catalog.domain.entities.persistence.Manufacturer;

public interface SelectOptionsMapper {
    List<CategoryOptionResponse> toCategoryOptionResponse(List<Category> category);
    List<ManufacturerOptionResponse> toManufacturerOptionResponse(List<Manufacturer> manufacturer);
}
