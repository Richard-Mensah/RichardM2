import { DEVELOPMENT_DATA } from "@/data/developmentData";

export async function GET() {
  return new Response(JSON.stringify(DEVELOPMENT_DATA), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
