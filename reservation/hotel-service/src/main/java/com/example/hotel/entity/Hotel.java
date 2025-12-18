package com.example.hotel.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    
    @Column(length = 1000)
    private String description;
    
    private int stars;
    private String image;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "hotel_amenities", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "amenity")
    private List<String> amenities = new ArrayList<>();

    public Hotel() {}
    public Hotel(String name, String location, String description, int stars, String image, List<String> amenities) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.stars = stars;
        this.image = image;
        this.amenities = amenities;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public int getStars() { return stars; }
    public void setStars(int stars) { this.stars = stars; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }
}
