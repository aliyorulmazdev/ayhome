"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Elevate Your Living Space with Intelligent Automation. Welcome to
        <span className="underline">ayHome</span>.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        ayHome is the connected smart living space where <br />
        convenience and innovation seamlessly blend.
      </h3>
      <Link href="/home">
        <Button>
          Enter ayHome
          <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
};
