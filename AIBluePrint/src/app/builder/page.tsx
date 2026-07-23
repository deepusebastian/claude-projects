import { redirect } from "next/navigation";

// /builder now lives at the home route
export default function BuilderPage() {
  redirect("/");
}
