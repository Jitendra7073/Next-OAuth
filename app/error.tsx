"use client";
export default function error({ error }: { error: string }) {
  return <div>Error: {error}</div>;
}
