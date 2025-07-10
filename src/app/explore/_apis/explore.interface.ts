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
  name: string;
  address: string;
  category: Category;
  openingHours: [number, number];
  phoneNumber: string;
  congestionDegreeList: CongestionDegree[];
  details: Details;
  isBookmarked: boolean;
}
