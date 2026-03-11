package dev.edu.inventory.adapters.payloads.kpi;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import dev.edu.inventory.domain.values.MovementStatus;

public record MovementStatusCount(
    MovementStatus status,
    Long totalMovements
) {
    public static Set<MovementStatusCount> from(Map<MovementStatus, Long> counter) {
        return counter.entrySet()
            .stream()
            .map(entry -> new MovementStatusCount(entry.getKey(), entry.getValue()))
            .collect(Collectors.toSet());
    }
}
