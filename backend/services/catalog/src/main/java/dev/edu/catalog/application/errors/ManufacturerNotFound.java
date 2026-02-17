package dev.edu.catalog.application.errors;

public class ManufacturerNotFound extends RuntimeException {
    public ManufacturerNotFound(String code) {
        super("Manufacturer with code " + code + " is not found");
    }
}
