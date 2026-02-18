package dev.edu.inventory.application.contracts;

public interface Query<H, R> {
    R accept(H handler);
}
