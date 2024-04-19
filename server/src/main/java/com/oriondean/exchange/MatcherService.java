package com.oriondean.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatcherService {
    private final List<Order> bidOrders; // sorted lowest to highest price (best offer)
    private final List<Order> askOrders; // sorted highest to lowest price (best offer)
    private final OrderRepository repository;

    private static final Logger log = LoggerFactory.getLogger(MatcherService.class);

    MatcherService(OrderRepository repository) {
        this.repository = repository;

        repository.save(new Order(1, 35, 25, OrderAction.BID, "dkerr", 25));
        repository.save(new Order(2, 40, 25, OrderAction.BID, "dkerr", 25));
        repository.save(new Order(3, 45, 25, OrderAction.BID, "dkerr", 25));

        Map<Boolean, List<Order>> initialOrders = repository
                .findAll()
                .stream()
                .collect(Collectors.partitioningBy(Order::isBid));

        this.bidOrders = initialOrders.get(Boolean.TRUE);
        this.askOrders = initialOrders.get(Boolean.FALSE);

        log.info("Initial Bids: " + this.bidOrders);
        log.info("Initial Asks: " + this.askOrders);
    }

    public List[] addOrder(Order newOrder) throws Exception {
        Optional<Order> order = match(newOrder, newOrder.isBid() ? askOrders : bidOrders);

        if (order.isPresent()) {
            int index = 0;
            List<Order> orders = order.get().isBid() ? bidOrders : askOrders;

            while (index < orders.size() && !orders.get(index).hasWorsePrice(order.get())) {
                index++;
            }

            // TODO: emit "new-order"
            orders.add(index, order.get());
            repository.save(order.get());
        }

        return new List[]{bidOrders, askOrders};
    }

    private Optional<Order> match(Order toMatch, List<Order> candidates) {
        Order order = toMatch;

        while (!candidates.isEmpty() && order.canMatch(candidates.getFirst())) {
            Order existing = candidates.getFirst();
            Integer matchedQuantity = Math.min(existing.getQuantity(), order.getQuantity());

            // TODO emit new trade (this.emit("new-trade"))
            //this.emit("new-trade", new Trade(existingOrder.price, matchedQuantity, order.action));

            if (order.getQuantity() >= existing.getQuantity()) {
                // TODO emit "matched-order"
                // this.emit("matched-order", existingOrder);
                Order removed = candidates.removeFirst(); // existing fully matched, remove
                repository.delete(removed);

                if (Objects.equals(order.getQuantity(), existing.getQuantity())) {
                    return Optional.empty();
                }

                order = order.reduceQuantity(existing.getQuantity());
            } else {
                Order removed = candidates.removeFirst();
                repository.delete(removed);

                Order toAdd = existing.reduceQuantity(order.quantity);
                repository.save(toAdd);
                candidates.addFirst(toAdd); // existing partially matched
                // TODO emit "partially-matched-order"
                // this.emit("partially-matched-order", candidates[0], existingOrder, matchedQuantity);
                return Optional.empty();
            }
        }

        return Optional.ofNullable(order);
    }
}
