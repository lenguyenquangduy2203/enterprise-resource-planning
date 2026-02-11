package dev.edu.catalog.application.contracts;

public interface Command<H> {
    void accept(H handler);
}
