package com.chillout.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class OrderItem {
    private String menuItemId;
    private String name;
    private Integer qty;
    private Double price;
}