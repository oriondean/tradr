package com.oriondean.exchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatcherService {
    private final List<Order> bidOrders; // sorted lowest to highest price (best offer)
    private final List<Order> askOrders; // sorted highest to lowest price (best offer)
    private final OrderRepository orderRepository;
    private final TradeRepository tradeRepository;

    private final SimpMessagingTemplate template;

    private static final Logger log = LoggerFactory.getLogger(MatcherService.class);

    MatcherService(OrderRepository orderRepository, TradeRepository tradeRepository, SimpMessagingTemplate template) {
        this.orderRepository = orderRepository;
        this.tradeRepository = tradeRepository;
        this.template = template;

        orderRepository.save(new Order(1, 35, 25, OrderAction.BID, "dkerr", 25));
        orderRepository.save(new Order(2, 40, 25, OrderAction.BID, "dkerr", 25));
        orderRepository.save(new Order(3, 40, 15, OrderAction.BID, "dkerr", 25));
        orderRepository.save(new Order(4, 45, 25, OrderAction.BID, "dkerr", 25));
        orderRepository.save(new Order(5, 50, 10, OrderAction.ASK, "dkerr", 10));
        orderRepository.save(new Order(6, 60, 45, OrderAction.ASK, "dkerr", 60));
        orderRepository.save(new Order(7, 35, 40, OrderAction.BID, "dkerr", 40));
        orderRepository.save(new Order(8, 46, 5, OrderAction.ASK, "dkerr", 10));
        tradeRepository.save(new Trade(50, 30, "system"));

        Map<Boolean, List<Order>> initialOrders = orderRepository.findAll().stream().collect(Collectors.partitioningBy(Order::isBid));

        this.bidOrders = initialOrders.get(Boolean.TRUE);
        this.askOrders = initialOrders.get(Boolean.FALSE);

        log.info("Initial Bids: " + this.bidOrders);
        log.info("Initial Asks: " + this.askOrders);
    }

    public List<Order>[] addOrder(Order newOrder) throws Exception {
        Optional<Order> order = match(newOrder, newOrder.isBid() ? askOrders : bidOrders);

        if (order.isPresent()) {
            int index = 0;
            List<Order> orders = order.get().isBid() ? bidOrders : askOrders;

            while (index < orders.size() && !orders.get(index).hasWorsePrice(order.get())) {
                index++;
            }

            // TODO: emit "new-order"
            orders.add(index, order.get());
            orderRepository.save(order.get());
        }
        this.template.convertAndSend("/topic/public/bids", getPublicBids());
        this.template.convertAndSend("/topic/public/asks", getPublicAsks());

        return new List[]{bidOrders, askOrders};
    }

    private Optional<Order> match(Order toMatch, List<Order> candidates) {
        Order order = toMatch;

        while (!candidates.isEmpty() && order.canMatch(candidates.getFirst())) {
            Order existing = candidates.getFirst();
            Integer matchedQuantity = Math.min(existing.getQuantity(), order.getQuantity());

            Trade trade = tradeRepository.save(new Trade(existing.getPrice(), matchedQuantity, order.getAccount()));

            this.template.convertAndSend("/topic/trades", List.of(trade) );

            if (order.getQuantity() >= existing.getQuantity()) {
                // TODO emit "matched-order"
                // this.emit("matched-order", existingOrder);
                Order removed = candidates.removeFirst(); // existing fully matched, remove
                orderRepository.delete(removed);

                if (Objects.equals(order.getQuantity(), existing.getQuantity())) {
                    return Optional.empty();
                }

                order = order.reduceQuantity(existing.getQuantity());
            } else {
                Order removed = candidates.removeFirst();
                orderRepository.delete(removed);

                Order toAdd = existing.reduceQuantity(order.quantity);
                orderRepository.save(toAdd);
                candidates.addFirst(toAdd); // existing partially matched
                // TODO emit "partially-matched-order"
                // this.emit("partially-matched-order", candidates[0], existingOrder, matchedQuantity);
                return Optional.empty();
            }
        }

        return Optional.ofNullable(order);
    }

    public Map<Integer, Integer> getPublicBids() {
        return orderRepository.findAllByAction(OrderAction.BID).stream()
                .collect(Collectors.toMap(Order::getPrice, Order::getQuantity, Integer::sum));
    }

    public Map<Integer, Integer> getPublicAsks() {
        return orderRepository.findAllByAction(OrderAction.ASK).stream()
                .collect(Collectors.toMap(Order::getPrice, Order::getQuantity, Integer::sum));
    }
}
