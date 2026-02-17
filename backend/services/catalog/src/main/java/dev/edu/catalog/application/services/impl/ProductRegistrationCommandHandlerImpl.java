package dev.edu.catalog.application.services.impl;

import org.springframework.stereotype.Component;

import dev.edu.catalog.application.commands.ProductRegistrationCommand;
import dev.edu.catalog.application.errors.CategoryNotFound;
import dev.edu.catalog.application.errors.ManufacturerNotFound;
import dev.edu.catalog.application.errors.RegisterExistingProduct;
import dev.edu.catalog.application.services.ProductRegistrationCommandHandler;
import dev.edu.catalog.domain.entities.persistence.Product;
import dev.edu.catalog.domain.repositories.CategoryRepository;
import dev.edu.catalog.domain.repositories.ManufacturerRepository;
import dev.edu.catalog.domain.repositories.ProductRepository;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ProductRegistrationCommandHandlerImpl implements ProductRegistrationCommandHandler {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ManufacturerRepository manufacturerRepository;
    
    @Override
    public void handle(ProductRegistrationCommand command) {
        var isExistedProduct = productRepository.existsBySku(command.sku());
        if (isExistedProduct) {
            throw new RegisterExistingProduct(command.sku());
        }

        var category = categoryRepository.findByCode(command.categoryCode())
            .orElseThrow(() -> new CategoryNotFound(command.categoryCode()));

        var manufacturer = manufacturerRepository.findByCode(command.manufacturerCode())
            .orElseThrow(() -> new ManufacturerNotFound(command.manufacturerCode()));

        var product = Product.register(
            command.sku(), 
            command.name(), 
            command.unit(), 
            command.unitPrice(), 
            command.description(), 
            category, 
            manufacturer
        );
        productRepository.save(product);
    }
}
