export interface CongestionDegree {
  population: number;
  time: string;
  degree: number;
}

export interface Category {
  high: string;
  middle: string[];
  low: string[];
}

export interface Details {
  pricePerPerson: [number, number];
  averagePrice: number;
  averageRating: number;
  shortsUrl: string;
}

export interface ShortsPlace {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  address: string;
  latitude: string;
  longitude: string;
  categoryHigh: string | null;
  categoryMiddle: string | null;
  categoryLow: string | null;
  shortsUrl: string;
  openingHours: string[];
  phoneNumber: string;
  pricePerPerson: number[];
  averagePrice: number;
  averageRating: string;
  bookmarks: { id: number }[];
}
