package dev.edu.catalog.application.queries;

import java.util.List;

import dev.edu.catalog.application.contracts.Query;
import dev.edu.catalog.application.services.ProductRegistrationQueryHandler;
import dev.edu.catalog.domain.entities.persistence.Manufacturer;

public record GetActiveManufacturerOptionsQuery() implements Query<ProductRegistrationQueryHandler, List<Manufacturer>> {
    @Override
    public List<Manufacturer> accept(ProductRegistrationQueryHandler handler) {
        return handler.handle(this);
    }
}
