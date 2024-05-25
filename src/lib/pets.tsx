interface Pet {
  petType: string;
  gender: boolean;
  age: string;
  weight: string;
  color: string;
  breed: number;
  microchip: string;
  neutered: boolean;
}

enum PetKeysToLabel {
  petType = 'Tipo',
  gender = 'Gênero',
  age = 'Idade',
  weight = 'Peso',
  color = 'Cor',
  breed = 'Raça',
  microchip = 'Microchip',
  neutered = 'Castrado',
}

export function renamePetObjectKey(key: keyof Pet | (string & {})) {
  const label = PetKeysToLabel[key as keyof Pet];
  if (label) {
    return label;
  }
  return key;
}
