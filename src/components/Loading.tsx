import { BeatLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-50">
      <BeatLoader color="#2563EB" />
    </div>
  );
};
