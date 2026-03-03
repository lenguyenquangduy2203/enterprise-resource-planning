package dev.edu.analysis.domain.clients;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.service.annotation.GetExchange;

import dev.edu.analysis.domain.clients.payloads.capital.Stock;
import dev.edu.analysis.domain.clients.payloads.movement.MovementStatistics;
import dev.edu.analysis.domain.clients.payloads.movement.query.MovementKpiQuery;
import jakarta.validation.Valid;

public interface InvClient {
    @GetExchange("/stocks?quantityGreaterThan=0")
    ResponseEntity<Set<Stock>> fetchActiveStocks();
    @GetExchange("/stock-movements/kpi")
    ResponseEntity<MovementStatistics> fetchOperationalKPI(@Valid @ModelAttribute MovementKpiQuery query);
}
