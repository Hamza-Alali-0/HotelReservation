package com.example.reservation.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final Map<String, Order> store = new ConcurrentHashMap<>();
    private final AtomicLong seq = new AtomicLong(500);

    private String nextId() { return String.valueOf(seq.getAndIncrement()); }

    @GetMapping
    public List<Order> query() {
        return new ArrayList<>(store.values());
    }

    @PostMapping
    public Order create(@RequestBody Order o) {
        if (o._id == null || o._id.isEmpty()) o._id = nextId();
        store.put(o._id, o);
        return o;
    }

    @PutMapping
    public Order update(@RequestBody Order o) {
        if (o._id == null) return o;
        store.put(o._id, o);
        return o;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable String id) {
        var o = store.get(id);
        if (o == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(o);
    }

    public static class Order {
        @JsonProperty("_id") public String _id;
        public Map<String, Object> buyer = new HashMap<>();
        public double totalPrice;
        public Date startDate;
        public Date endDate;
        public Map<String, Integer> guests = new HashMap<>();
        public Map<String, Object> host = new HashMap<>();
        public Map<String, Object> stay = new HashMap<>();
        public String status = "pending";
    }
}
