import { sleep } from "@/lib/utils";

export interface SignUpBody {
  email: string;
  password: string;
}

export async function signUp({ email, password }: SignUpBody) {
  // await api.post("/authenticate", { email });
  await sleep(4000);
}
