package com.oriondean.exchange;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MatcherService {
    private final List<Order> bidOrders = new ArrayList<>(); // sorted lowest to highest price (best offer)
    private final List<Order> askOrders = new ArrayList<>(); // sorted highest to lowest price (best offer)

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
                candidates.removeFirst(); // existing fully matched, remove

                if (Objects.equals(order.getQuantity(), existing.getQuantity())) {
                    return Optional.empty();
                }

                order = order.reduceQuantity(existing.getQuantity());
            } else {
                candidates.removeFirst();
                candidates.addFirst(existing.reduceQuantity(order.quantity)); // existing partially matched
                // TODO emit "partially-matched-order"
                // this.emit("partially-matched-order", candidates[0], existingOrder, matchedQuantity);
                return Optional.empty();
            }
        }

        return Optional.ofNullable(order);
    }
}
