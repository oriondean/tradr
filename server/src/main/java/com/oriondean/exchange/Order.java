package com.oriondean.exchange;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Entity
@Table(name = "Order_")
@AllArgsConstructor
public class Order {
    @Id @GeneratedValue
    @Setter Integer id;

    @Setter Integer price;
    @Setter Integer quantity;
    @Setter OrderAction action;
    final String account;
    final Integer initialQuantity;

    Order() {
        id = null;
        price = -1;
        quantity = 0;
        action = OrderAction.ASK;
        account = "system";
        initialQuantity = 0;
    }

    Order(Integer price, Integer quantity, OrderAction action, String account) {
        this.id = null; // auto generated
        this.price = price;
        this.quantity = quantity;
        this.initialQuantity = quantity;
        this.action = action;
        this.account = account;
    }

    public static Order fromOrderRequest(OrderRequest request) {
        return new Order(request.price(), request.quantity(), request.action(), request.account());
    }

    public boolean isBid() {
        return this.action == OrderAction.BID;
    }

    public boolean canMatch(Order order) {
        if (isBid() == order.isBid()) {
            return false; // can't match orders of identical sides
        }

        return isBid() ? price < order.price : price >= order.price;
    }

    public boolean hasWorsePrice(Order order) throws Exception {
        if (isBid() != order.isBid()) {
            throw new Exception("Cannot compare prices between orders with different actions");
        }

        return isBid() ? price > order.price : price < order.price;
    }

    public Order reduceQuantity(Integer amount) {
        return new Order(id, price, quantity - amount, action, account, initialQuantity);
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (!(o instanceof Order)) {
            return false;
        }
        Order order = (Order) o;
        return Objects.equals(this.id, order.id);
    }
}
