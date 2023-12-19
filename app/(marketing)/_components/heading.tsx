"kullanıcı kullan";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Akıllı Otomasyon ile Yaşam Alanınızı Yükseltin.<br/><span className="underline">ayHome</span>'a Hoş geldiniz,
        
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        ayHome, rahatlık ve yenilikçiliğin sorunsuzca iç içe geçtiği bağlantılı akıllı yaşam alanıdır. <br />
      </h3>
      <Link href="/home">
        <Button>
          ayHome Giriş
          <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
};
