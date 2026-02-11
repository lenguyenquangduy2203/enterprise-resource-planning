package dev.edu.catalog.application.services;

import java.util.List;

import dev.edu.catalog.application.queries.GetActiveCategoryOptionsQuery;
import dev.edu.catalog.application.queries.GetActiveManufacturerOptionsQuery;
import dev.edu.catalog.domain.entities.persistence.Category;
import dev.edu.catalog.domain.entities.persistence.Manufacturer;

public interface ProductRegistrationQueryHandler {
    List<Category> handle(GetActiveCategoryOptionsQuery query);
    List<Manufacturer> handle(GetActiveManufacturerOptionsQuery query);
}
