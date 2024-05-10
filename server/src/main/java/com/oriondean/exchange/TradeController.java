package com.oriondean.exchange;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("trade")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TradeController {

    private final TradeRepository repository;

    @GetMapping("/{aggressor}")
    List<Trade> getAggressorsOrders(@PathVariable String aggressor) {
        return repository.findAllByAggressor(aggressor);
    }
}
