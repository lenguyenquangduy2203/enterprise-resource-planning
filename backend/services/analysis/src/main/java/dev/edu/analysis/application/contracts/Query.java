package dev.edu.analysis.application.contracts;

public interface Query<H, R> {
    R accept(H handler);
}
