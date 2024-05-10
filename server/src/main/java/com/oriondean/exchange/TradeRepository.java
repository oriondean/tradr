package com.oriondean.exchange;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface TradeRepository extends JpaRepository<Trade, Integer> {

    List<Trade> findAllByAggressor(String aggressor);
}
