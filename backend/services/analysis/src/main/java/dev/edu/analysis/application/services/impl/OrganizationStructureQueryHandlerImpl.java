package dev.edu.analysis.application.services.impl;

import org.springframework.stereotype.Component;

import dev.edu.analysis.application.errors.EmptyAggregationException;
import dev.edu.analysis.application.errors.OrganizationStructureAggregationException;
import dev.edu.analysis.application.queries.OrganizationStructureQuery;
import dev.edu.analysis.application.services.OrganizationStructureQueryHandler;
import dev.edu.analysis.domain.clients.HRClient;
import dev.edu.analysis.domain.clients.payloads.workforce.Workforce;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class OrganizationStructureQueryHandlerImpl implements OrganizationStructureQueryHandler {
    private final HRClient hrClient;

    @Override
    public Workforce handle(OrganizationStructureQuery query) {
        var resp = hrClient.fetchDepartmentWorkforce();
        var status = resp.getStatusCode();
        if (!status.is2xxSuccessful()) {
            throw new OrganizationStructureAggregationException(status.value());
        }

        if (!resp.hasBody()) {
            throw new EmptyAggregationException(status.value());
        }

        return resp.getBody();
    }
}
