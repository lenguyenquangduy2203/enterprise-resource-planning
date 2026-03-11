package dev.edu.inventory.adapters.payloads.kpi;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import dev.edu.inventory.domain.values.MovementType;

public record MovementTypeCount(
    MovementType type,
    Long totalMovements
) {
    public static Set<MovementTypeCount> from(Map<MovementType, Long> counter) {
        return counter.entrySet()
            .stream()
            .map(entry -> new MovementTypeCount(entry.getKey(), entry.getValue()))
            .collect(Collectors.toSet());
    }
}
