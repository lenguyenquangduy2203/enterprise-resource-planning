package dev.edu.inventory.adapters.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.inventory.application.queries.WarehouseLookupQuery;
import dev.edu.inventory.application.services.LookupQueryHandler;
import dev.edu.inventory.domain.repositories.projections.WarehouseSelection;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/lookups")
public class LookupsController {
    private final LookupQueryHandler lookupQueryHandler;

    @GetMapping("/warehouses")
    public ResponseEntity<List<WarehouseSelection>> getWarehouseSelections() {
        var resp = new WarehouseLookupQuery().accept(lookupQueryHandler);

        return ResponseEntity.ok(resp);
    }
}
