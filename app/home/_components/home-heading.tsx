"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { HomeLights } from "./home-lights";

export const HomeHeading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Welcome to your Smart Living Space,{" "}
        <span className="underline">ayHome</span>.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Manage your home effortlessly. Control lights, appliances, and more with
        innovative automation.
      </h3>
      <Link href="/home">
        <Button
          onClick={() => {
            toast({
              title: "Your Request has been received",
              description: "We will contact you as soon as possible.",
            });
          }}
        >
          Want us to Call You ?
          <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
};
