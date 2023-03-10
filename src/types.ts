export interface Location {
  type: string;
  location: string;
  valid: boolean;
}

export interface Geolocation {
  capable: boolean;
  allowed: boolean;
  buttonText: string;
}