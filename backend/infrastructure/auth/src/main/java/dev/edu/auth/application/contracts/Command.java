package dev.edu.auth.application.contracts;

public interface Command<H, R> {
    R accept(H handler);
}
