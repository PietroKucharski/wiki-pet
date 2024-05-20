import { sleep } from "@/lib/utils";

export interface CreatePetBody {
  userId: string;
  name: string;
  petType: string;
  age: string;
  weight: string;
  color: string;
  breed: string;
  peculiarities: string;
  microchip: string;
  neutered: boolean;
}

export async function createPet(petData: CreatePetBody) {
  console.log("PET DATA: ", petData);

  // await api.post("/authenticate", { email });
  await sleep(4000);
}
