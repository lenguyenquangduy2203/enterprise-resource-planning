package dev.edu.catalog.application.queries;

import java.util.List;

import dev.edu.catalog.application.contracts.Query;
import dev.edu.catalog.application.services.ProductRegistrationQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Category;

public record GetActiveCategoryOptionsQuery() implements Query<ProductRegistrationQueryHandler, List<Category>> {
    @Override
    public List<Category> accept(ProductRegistrationQueryHandler handler) {
        return handler.handle(this);
    }
}
