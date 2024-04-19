package com.oriondean.exchange;

import com.oriondean.exchange.data.PublicOrder;
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
    @GetMapping("/bids")
    List<PublicOrder> getBids() {
        return service.getPublicBids();
    }
    @GetMapping("/asks")
    List<PublicOrder> getAsks() {
        return service.getPublicAsks();
    }

    @PostMapping("/")
    List[] newOrder(@RequestBody Order newOrder) throws Exception {
        Order toAdd = new Order(newOrder.getPrice(), newOrder.getQuantity(), newOrder.getAction(), newOrder.getAccount());
        return service.addOrder(toAdd);
    }

    @PutMapping("/{id}")
    Order replaceOrder(@RequestBody Order newOrder, @PathVariable Integer id) {
        return repository.findById(id)
                .map(order -> {
                    order.setPrice(newOrder.getPrice());
                    order.setQuantity(newOrder.getQuantity());
                    order.setAction(newOrder.getAction());
                    return repository.save(order);
                })
                .orElseGet(() -> {
                    newOrder.setId(id);
                    return repository.save(newOrder);
                });
    }

    // TODO: account match check
    @DeleteMapping("/{id}")
    void deleteOrder(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
