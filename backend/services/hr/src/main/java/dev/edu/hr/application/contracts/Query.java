package dev.edu.hr.application.contracts;

public interface Query<H, R> {
    R accept(H handler);
}
