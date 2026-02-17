package dev.edu.catalog.application.services;

import dev.edu.catalog.application.commands.ProductRegistrationCommand;

public interface ProductRegistrationCommandHandler {
    void handle(ProductRegistrationCommand command);
}
