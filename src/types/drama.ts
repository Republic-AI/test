
export interface Tag {
  id: string;
  label: string;
  iconUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  job: string;
  description: string;
  imageUrl: string;
  jumpTo: string;
}

export interface Drama {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  jumpTo: string;
  characters: Character[];
}

export interface TabContent {
  drama: Drama;
}
