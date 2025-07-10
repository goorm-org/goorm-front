export interface Place {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  address: string;
  latitude: string;
  longitude: string;
  categoryHigh: string;
  shortsUrl: string;
  categoryMiddle: string[];
  categoryLow: string[];
  openingHours: string[];
  phoneNumber: string;
  pricePerPerson: number[];
  averagePrice: number;
  averageRating: string;
}

export interface SavedPlace {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  place: Place;
}
