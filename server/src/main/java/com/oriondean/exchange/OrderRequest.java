package com.oriondean.exchange;

public record OrderRequest(Integer price, Integer quantity, OrderAction action, String account) {
}
