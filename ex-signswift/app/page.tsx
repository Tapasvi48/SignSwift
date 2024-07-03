import Image from "next/image";
import { getServerSession, Session } from "next-auth";

import { redirect, useRouter } from "next/navigation";

import { config } from "@/lib/auth";

import axios from "axios";
export default async function Home() {
  const session: Session | null = await getServerSession(config);

  // const router = useRouter();
  if (!session) {
    redirect("/login");
  } else {
    console.log(session.user);
    const response = await axios.post(
      "http://localhost:3000/api/users/registerUser",
      session.user
    );
    console.log(response.data.user.customerId);
    redirect(`/user/${response.data.user.customerId}`);
  }

  return <></>;
}
