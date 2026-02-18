package dev.edu.inventory.application.contracts;

public interface Command<H, R> {
    R accept(H handler);
}
