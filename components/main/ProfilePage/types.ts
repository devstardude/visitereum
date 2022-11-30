export interface Profile {
  profile: {
    name: string;
    description: string;
    birthDate: string;
    gender: string;
    homeLocation: string;
    image: any;
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
