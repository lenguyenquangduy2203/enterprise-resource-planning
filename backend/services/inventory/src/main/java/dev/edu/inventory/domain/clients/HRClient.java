package dev.edu.inventory.domain.clients;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.HttpExchange;

import dev.edu.inventory.domain.clients.payloads.EmployeeStats;

public interface HRClient {
    @HttpExchange(method = "GET", url = "/stats/employees/{employeeId}")
    public ResponseEntity<EmployeeStats> getEmployeeStatsById(@PathVariable UUID employeeId);
}
