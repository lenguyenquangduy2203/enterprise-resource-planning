package dev.edu.inventory.adapters.controllers;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.inventory.adapters.mappers.CapitalSnapshotMapper;
import dev.edu.inventory.adapters.payloads.CapitalStock;
import dev.edu.inventory.application.queries.InStockCapitalSnapshotQuery;
import dev.edu.inventory.application.services.InStockCapitalSnapshotQueryHandler;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/capital")
public class CapitalController {
    private final InStockCapitalSnapshotQueryHandler inStockCapitalSnapshotQueryHandler;
    private final CapitalSnapshotMapper capitalSnapshotMapper;

    @GetMapping("/stocks")
    public ResponseEntity<Set<CapitalStock>> fetchActiveStocks() {
        var snapshots = new InStockCapitalSnapshotQuery().accept(inStockCapitalSnapshotQueryHandler);
        var stocks = capitalSnapshotMapper.toCapitalStocks(snapshots);

        return ResponseEntity.ok(stocks);
    }
}
