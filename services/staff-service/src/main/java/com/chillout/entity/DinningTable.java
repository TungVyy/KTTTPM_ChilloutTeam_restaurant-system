package com.chillout.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dinning_tables")
@Data
public class DinningTable {
    @Id
    private String id; // Khớp chuỗi định dạng dữ liệu "ban01", "ban02" ở FE
    private String name;
    private Integer seats;
    private String status; // "empty", "occupied", "reserved"
}