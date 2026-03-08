package dev.edu.analysis.domain.clients;

import org.springframework.http.ResponseEntity;
import org.springframework.web.service.annotation.GetExchange;

import dev.edu.analysis.domain.clients.payloads.workforce.Workforce;

public interface HRClient {
    @GetExchange(url = "/workforce")
    ResponseEntity<Workforce> fetchDepartmentWorkforce();
}
