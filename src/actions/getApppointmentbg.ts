
import { API_ENDPOINT } from "@/shared/constants";
import { unstable_noStore } from "next/cache";

export async function getAppointmentBg(){
  unstable_noStore()
  const res = await fetch(`${API_ENDPOINT}/home/appointment`);
  if (!res.ok) {
    return;
  }
  return res.json();
}
