import { redirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.search || searchParams.search.length === 0)
    return redirect("/");
  return <></>;
}
