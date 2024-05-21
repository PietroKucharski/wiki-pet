interface Pet {
  petType: string;
  age: string;
  weight: string;
  color: string;
  breed: number;
  peculiarities: string;
  microchip: string;
  neutered: string;
}

enum PetKeysToLabel {
  petType = 'Pet Type',
  age = 'Age',
  weight = 'Weight',
  color = 'Color',
  breed = 'Breed',
  peculiarities = 'Peculiarities',
  microchip = 'Microchip',
  neutered = 'Neutered',
}

export function renamePetObjectKey(key: keyof Pet | (string & {})) {
  const label = PetKeysToLabel[key as keyof Pet];
  if (label) {
    return label;
  }
  return key;
}
