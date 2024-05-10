package com.oriondean.exchange;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllByAction(OrderAction action);

    List<Order> findAllByAccount(String account);
}
