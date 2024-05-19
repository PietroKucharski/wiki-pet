import { sleep } from "@/lib/utils";

export interface CreatePetBody {
  userId: string;
  name: string;
  petType: string;
  age: number;
  weight: number;
  color: string;
  breed: string;
  neutered: boolean;
  vaccines: string[];
}

export async function createPet(petData: CreatePetBody) {
  console.log("PET DATA: ", petData);

  // await api.post("/authenticate", { email });
  await sleep(4000);
}
