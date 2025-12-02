package com.example.reservation.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/stay")
public class StayController {

    private final Map<String, Stay> store = new ConcurrentHashMap<>();
    private final AtomicLong seq = new AtomicLong(100);

    @PostConstruct
    void init() {
        // seed a couple of stays so frontend has data
        var s1 = new Stay(nextId(), "Apartment", "Cozy Downtown Apt", List.of("/assets/img/readme/apt1.jpg"), 75.0, "Nice central apartment", 2);
        var s2 = new Stay(nextId(), "Private room", "Sunny Room Near Park", List.of("/assets/img/readme/room1.jpg"), 45.0, "Private room in a friendly home", 1);
        store.put(s1._id, s1);
        store.put(s2._id, s2);
    }

    private String nextId() { return String.valueOf(seq.getAndIncrement()); }

    @GetMapping
    public List<Stay> query(@RequestParam(required = false) String page) {
        return new ArrayList<>(store.values());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stay> getById(@PathVariable String id) {
        var s = store.get(id);
        if (s == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(s);
    }

    @GetMapping("/length")
    public Map<String, Integer> length() {
        return Map.of("length", store.size());
    }

    @PostMapping
    public Stay create(@RequestBody Stay s) {
        if (s._id == null || s._id.isEmpty()) s._id = nextId();
        store.put(s._id, s);
        return s;
    }

    @PutMapping
    public Stay update(@RequestBody Stay s) {
        if (s._id == null) s._id = nextId();
        store.put(s._id, s);
        return s;
    }

    public static class Stay {
        @JsonProperty("_id")
        public String _id;
        public String type;
        public String name;
        public List<String> imgUrls = new ArrayList<>();
        public double price;
        public String summary;
        public int capacity;

        public Stay() {}

        public Stay(String _id, String type, String name, List<String> imgUrls, double price, String summary, int capacity) {
            this._id = _id; this.type = type; this.name = name; this.imgUrls = imgUrls; this.price = price; this.summary = summary; this.capacity = capacity;
        }
    }
}
