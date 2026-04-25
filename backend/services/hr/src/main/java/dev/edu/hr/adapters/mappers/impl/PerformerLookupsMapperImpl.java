package dev.edu.hr.adapters.mappers.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import dev.edu.hr.adapters.mappers.PerformerLookupsMapper;
import dev.edu.hr.adapters.payloads.PerformerLookupsParams;
import dev.edu.hr.adapters.payloads.PerformerSelectOption;
import dev.edu.hr.application.queries.SearchEmployeeQuery;
import dev.edu.hr.domain.entities.persistence.Employee;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PerformerLookupsMapperImpl implements PerformerLookupsMapper {
    @Override
    public SearchEmployeeQuery toSearchEmployeeQuery(PerformerLookupsParams params) {
        return new SearchEmployeeQuery(
            params.departmentCode(), 
            params.positionCode(),
            null, 
            null, 
            params.matchName(),
            null, 
            Pageable.ofSize(5)
        );
    }

    @Override
    public List<PerformerSelectOption> toPerformerSelectOptions(Page<Employee> employees) {
        return employees
            .map(employee -> new PerformerSelectOption(employee.getId(), employee.getFullname()))
            .toList();
    }
}
