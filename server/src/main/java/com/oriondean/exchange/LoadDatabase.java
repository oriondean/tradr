package com.oriondean.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(OrderRepository repository) {

        return args -> {
            log.info("Preloading " + repository.save(new Order(1, 35, 25, OrderAction.BID, "dkerr", 25)));
            log.info("Preloading " + repository.save(new Order(2, 40, 25, OrderAction.BID, "dkerr", 25)));
        };
    }
}
