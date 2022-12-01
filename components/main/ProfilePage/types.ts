export interface Profile {
  profile: {
    name?: string;
    description?: string;
    birthDate?: string;
    gender?: string;
    homeLocation?: string;
    image?: any;
  };
}

export interface userData {
  name?: string;
  description?: string;
  birthDate?: string;
  gender?: string;
  homeLocation?: string;
  image?: any;
}

export interface placeDataWrite {
  id: string;
  address: string;
  description: string;
  image: File;
  lattitude: string;
  longitude: string;
  type: string;
}
