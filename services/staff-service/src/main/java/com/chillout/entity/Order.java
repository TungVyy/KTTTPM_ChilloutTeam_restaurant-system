package com.chillout.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "staff_orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tableId;
    private Double totalAmount;
    private String status; // "pending", "paid"

    @ElementCollection
    @CollectionTable(name = "staff_order_items", joinColumns = @JoinColumn(name = "order_id"))
    private List<OrderItem> items;
}