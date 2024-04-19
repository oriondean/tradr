package com.oriondean.exchange;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.Instant;

@Entity
public class Trade {
    final @JsonProperty @Id @GeneratedValue Integer id;
    @JsonProperty final Integer price;
    @JsonProperty final Integer quantity;
    @JsonProperty final Instant created;
    @JsonProperty final String aggressor;

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
}
