import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/signin");
  }
  
  // @ts-ignore - session user has role field
  if (user.role !== "ADMIN") {
    redirect("/404");
  }
  
  return user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  // @ts-ignore - session user has role field
  return user?.role === "ADMIN";
}

