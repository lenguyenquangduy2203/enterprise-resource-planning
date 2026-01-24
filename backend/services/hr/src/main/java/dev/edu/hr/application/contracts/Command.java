package dev.edu.hr.application.contracts;

public interface Command<H> {
    void accept(H handler);
}
