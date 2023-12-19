"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const HomeHeading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Akıllı Yaşam Alanınıza Hoş Geldiniz,
        <span className="underline">ayHome</span>.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium pb-5">
        Ev yönetimini kolayca gerçekleştirin. Işıkları, cihazları ve daha
        fazlasını yenilikçi otomasyon ile kontrol edin.
      </h3>
      <Link href="/home">
      <Button
          onClick={() => {
            toast({
              title: "Talebiniz alındı",
              description: "En kısa sürede sizinle iletişime geçeceğiz.",
            });
          }}
        >
          Sizi Aramamızı İster misiniz ?
          <ArrowRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
};
