import { getToken } from "@/actions";

export default async function Home() {
  await getToken();

  return (
    <h1>index page</h1>
  );
}
