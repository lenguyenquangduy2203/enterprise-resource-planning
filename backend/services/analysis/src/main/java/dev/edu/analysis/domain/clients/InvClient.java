package dev.edu.analysis.domain.clients;

import java.time.OffsetDateTime;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

import dev.edu.analysis.domain.clients.payloads.capital.Stock;
import dev.edu.analysis.domain.clients.payloads.movement.MovementStatistics;

public interface InvClient {
    @GetExchange("/kpi")
    ResponseEntity<MovementStatistics> fetchOperationalKPI(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime createdFrom,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime createdTo
    );
    @GetExchange("/capital/stocks")
    ResponseEntity<Set<Stock>> fetchActiveStocks();
}
