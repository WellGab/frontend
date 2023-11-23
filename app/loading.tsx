import Head from "next/head";

// create a loading component using tailwindcss for nextjs 13
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Loading...</h1>
      </main>
    </div>
  );
}
