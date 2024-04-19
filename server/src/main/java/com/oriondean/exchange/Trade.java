package com.oriondean.exchange;

import com.fasterxml.jackson.databind.json.JsonMapper;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.Instant;

@Entity
public class Trade {
    final @Id @GeneratedValue Integer id;
    final Integer price;
    final Integer quantity;
    final Instant created;
    final String aggressor;

    Trade() {
        this.id = null;
        this.price = 0;
        this.quantity = 0;
        this.created = Instant.EPOCH;
        this.aggressor = "system";
    }

    Trade(Integer price, Integer quantity, String aggressor) {
        this.id = null;
        this.price = price;
        this.quantity = quantity;
        this.created = Instant.now();
        this.aggressor = aggressor;
    }

    public String getContent() {
        return "{ \"id\":" + id + ", \"price\": " + price + ", \"quantity\": " + quantity + "}";
    }
}
