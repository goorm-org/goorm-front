export interface MapLocation {
  placeName: string;
  categoryHigh: string;
  address: string;
  latitude: number;
  longitude: number;
}
[];

export interface ShortsData {
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
  bookmarks: { id: number }[];
  congestionDegreeList: { [key: string]: string | number | null }[];
}
