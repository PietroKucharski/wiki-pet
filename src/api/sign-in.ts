import { sleep } from "@/lib/utils";

export interface SignInBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function signIn({ name, password, role, email }: SignInBody) {
  // await api.post("/authenticate", { email });
  await sleep(4000);
}
