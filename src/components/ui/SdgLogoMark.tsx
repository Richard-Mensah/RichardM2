import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function SdgLogoMark({ className }: Props) {
  return (
    <div className={cn("relative", className)}>
      <div className="sdg-conic absolute inset-0 rounded-full opacity-30 blur-md" />
      <div className="relative h-full w-full">
        <Image
          src="/sdg-impact-wheel.svg"
          alt="SDG impact wheel — Sustainable Development Goals colour palette"
          fill
          className="logo-wheel-shadow rounded-[2rem] object-contain"
        />
      </div>
    </div>
  );
}
