// Hotel Images (using high-quality placeholders)
export const hotelImages = {
  hotel1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  hotel2: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
  hotel3: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  hotel4: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  hotel5: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  hotel6: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
};

// Hero Background
export const heroImages = {
  main: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=80',
  luxury: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
};

// Room Images
export const roomImages = {
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  suite: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
  standard: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  penthouse: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
};

// Destination Images
export const destinationImages = {
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  newYork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
};

// Icons
export const icons = {
  star: '⭐',
  location: '📍',
  calendar: '📅',
  user: '👤',
  hotel: '🏨',
  bed: '🛏️',
  wifi: '📶',
  pool: '🏊',
  restaurant: '🍽️',
  gym: '💪',
  parking: '🅿️',
  spa: '💆',
  beach: '🏖️',
  checkmark: '✓',
  search: '🔍',
};

// Helper to get hotel image by ID
export const getHotelImage = (hotelId: number): string => {
  const images = Object.values(hotelImages);
  return images[(hotelId - 1) % images.length] || images[0];
};

// Helper to get random room image
export const getRoomImage = (): string => {
  const images = Object.values(roomImages);
  return images[Math.floor(Math.random() * images.length)];
};
