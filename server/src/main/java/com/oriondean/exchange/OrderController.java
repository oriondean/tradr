package com.oriondean.exchange;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("order")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    private final OrderRepository repository;
    private final MatcherService service;

    @GetMapping("/{id}")
    Optional<Order> getSingle(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @GetMapping("/")
    List<Order> getAll() {
        return repository.findAll();
    }

    @PostMapping("/")
    List<Order>[] newOrder(@RequestBody OrderRequest request) throws Exception {
        Order toAdd = Order.fromOrderRequest(request);
        return service.addOrder(toAdd);
    }
}
