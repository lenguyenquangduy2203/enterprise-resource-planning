package dev.edu.catalog.adapters.controllers;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.edu.catalog.adapters.mappers.CapitalSnapshotMapper;
import dev.edu.catalog.adapters.payloads.CapitalProductSnapshot;
import dev.edu.catalog.application.queries.InStockCapitalProductSnapshotQuery;
import dev.edu.catalog.application.services.CapitalQueryHandler;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/capital")
public class CapitalController {
    private final CapitalQueryHandler capitalQueryHandler;
    private final CapitalSnapshotMapper capitalSnapshotMapper;

    @GetMapping("/products")
    ResponseEntity<Set<CapitalProductSnapshot>> findProductsIn(@RequestParam("ids") Set<Long> productIds) {
        var query = new InStockCapitalProductSnapshotQuery(productIds);
        var products = query.accept(capitalQueryHandler);
        var snapshots = capitalSnapshotMapper.toCapitalProductSnapshots(products);

        return ResponseEntity.ok(snapshots);
    };
}
