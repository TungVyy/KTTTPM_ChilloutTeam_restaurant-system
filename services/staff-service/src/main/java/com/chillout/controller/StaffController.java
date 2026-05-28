package com.chillout.controller;

import com.chillout.entity.DinningTable;
import com.chillout.entity.Order;
import com.chillout.repository.DinningTableRepository;
import com.chillout.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép FrontEnd kết nối sang trực tiếp
public class StaffController {

    @Autowired
    private DinningTableRepository tableRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/tables")
    public ResponseEntity<List<DinningTable>> getTables() {
        return ResponseEntity.ok(tableRepository.findAll());
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> submitOrder(@RequestBody Order order) {
        order.setStatus("pending");
        double total = order.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQty()).sum();
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);

        // Tự động đổi trạng thái bàn ăn sang có khách (occupied)
        tableRepository.findById(order.getTableId()).ifPresent(t -> {
            t.setStatus("occupied");
            tableRepository.save(t);
        });

        return ResponseEntity.ok(saved);
    }
}