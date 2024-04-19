package com.oriondean.exchange.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PublicOrder {

    private int quantity;
    private int price;

}
