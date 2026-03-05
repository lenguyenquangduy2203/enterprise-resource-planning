package dev.edu.catalog.adapters.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.catalog.adapters.mappers.SelectOptionsMapper;
import dev.edu.catalog.adapters.payloads.ManufacturerOptionResponse;
import dev.edu.catalog.application.queries.GetActiveManufacturerOptionsQuery;
import dev.edu.catalog.application.services.ProductRegistrationQueryHandler;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/manufacturers")
@AllArgsConstructor
public class ManufacturerController {
    private final ProductRegistrationQueryHandler productRegistrationQueryHandler;
    private final SelectOptionsMapper selectOptionsMapper;

    @GetMapping("/lookups")
    public ResponseEntity<List<ManufacturerOptionResponse>> getSelectOptions() {
        var res = new GetActiveManufacturerOptionsQuery().accept(productRegistrationQueryHandler);
        var options = selectOptionsMapper.toManufacturerOptionResponse(res);

        return ResponseEntity.ok(options);
    }
}
