// src/app/models/hospital.model.ts
export interface Tags {
    name?: string;
    'addr:full'?: string;
    phone?: string;
    // Add other potential fields here if needed
  }
  
  export interface HospitalElement {
    lat: number;
    lon: number;
    tags: Tags;
  }
  
  export interface OverpassResponse {
    elements: HospitalElement[];
  }
  
  export interface Hospital {
    name: string;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
  }
  