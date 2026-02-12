package dev.edu.catalog.application.errors;

public class CategoryNotFound extends RuntimeException {
    public CategoryNotFound(String code) {
        super("Category with code " + code + " is not found");
    }
}
