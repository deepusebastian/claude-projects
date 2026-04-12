import { Suspense } from "react";
import BuilderClient from "./BuilderClient";

function BuilderFallback() {
  return (
    <div className="min-h-screen flex flex-col pt-[76px] pb-6 px-6 max-w-[860px] mx-auto items-center justify-center text-gray-400 text-sm">
      Loading builder…
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <BuilderClient />
    </Suspense>
  );
}
