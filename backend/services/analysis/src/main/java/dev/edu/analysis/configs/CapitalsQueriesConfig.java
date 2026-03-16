package dev.edu.analysis.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dev.edu.analysis.application.queries.capitals.CapitalByCategory;
import dev.edu.analysis.application.queries.capitals.CapitalByWarehouse;
import dev.edu.analysis.application.queries.capitals.CapitalDistributionQuery;

@Configuration
public class CapitalsQueriesConfig {
    @Bean
    CapitalDistributionQuery warehouseStrategy() {
        return new CapitalByWarehouse();
    }

    @Bean
    CapitalDistributionQuery categoryStrategy() {
        return new CapitalByCategory();
    }
}
