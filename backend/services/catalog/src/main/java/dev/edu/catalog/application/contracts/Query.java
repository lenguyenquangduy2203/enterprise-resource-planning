package dev.edu.catalog.application.contracts;

public interface Query<H, R> {
    R accept(H handler);
}
