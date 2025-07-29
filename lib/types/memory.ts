export type MemoryCategory = 'date' | 'travel' | 'anniversary' | 'daily';

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: Location;
  images: string[];
  description: string;
  category: MemoryCategory;
  weather?: string;
  music?: string;
}

export interface MemoryWithDate extends Omit<Memory, 'date'> {
  date: Date;
}