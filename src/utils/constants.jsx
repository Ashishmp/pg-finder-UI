export const INITIAL_PGS = [
  {
    id: 1,
    title: 'Cozy Studio in Downtown',
    location: 'Downtown, Mumbai',
    price: '₹15,000',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen'],
    owner: 'John Doe',
    ownerEmail: 'john@example.com',
    phone: '+91 98765 43210',
    email: 'john@example.com',
    description: 'Beautiful studio apartment with all modern amenities in the heart of the city.',
    availability: 'Available',
    type: 'Single'
  },
  {
    id: 2,
    title: 'Shared Room Near IT Park',
    location: 'Whitefield, Bangalore',
    price: '₹8,000',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    amenities: ['WiFi', 'Food', 'Security'],
    owner: 'Sarah Smith',
    ownerEmail: 'sarah@example.com',
    phone: '+91 87654 32109',
    email: 'sarah@example.com',
    description: 'Clean and comfortable shared accommodation perfect for working professionals.',
    availability: 'Available',
    type: 'Shared'
  }
];

export const ROOM_TYPES = [
  { value: 'Single', label: 'Single Room' },
  { value: 'Shared', label: 'Shared Room' },
  { value: 'Studio', label: 'Studio Apartment' }
];

export const AMENITIES_LIST = [
  'WiFi', 'AC', 'Laundry', 'Kitchen', 'Food', 'Security', 
  'Parking', 'Gym', 'TV', 'Refrigerator', 'Water Cooler', 'Balcony'
];

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'single', label: 'Single Room' },
  { value: 'shared', label: 'Shared Room' },
  { value: 'studio', label: 'Studio Apartment' }
];