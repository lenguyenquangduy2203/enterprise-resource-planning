package dev.edu.catalog.application.services.impl;

import java.util.List;

import org.springframework.stereotype.Component;

import dev.edu.catalog.application.queries.GetActiveCategoryOptionsQuery;
import dev.edu.catalog.application.queries.GetActiveManufacturerOptionsQuery;
import dev.edu.catalog.application.services.ProductRegistrationQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Category;
import dev.edu.catalog.domain.entities.persistence.Manufacturer;
import dev.edu.catalog.domain.repositories.CategoryRepository;
import dev.edu.catalog.domain.repositories.ManufacturerRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ProductRegistrationQueryHandlerImpl implements ProductRegistrationQueryHandler {
    private final CategoryRepository categoryRepository;
    private final ManufacturerRepository manufacturerRepository;

    @Override
    public List<Category> handle(GetActiveCategoryOptionsQuery query) {
        return categoryRepository.findAll()
            .stream()
            .filter(Category::isActive)
            .toList();
    }

    @Override
    public List<Manufacturer> handle(GetActiveManufacturerOptionsQuery query) {
        return manufacturerRepository.findAll()
            .stream()
            .filter(Manufacturer::isActive)
            .toList();
    }

}
