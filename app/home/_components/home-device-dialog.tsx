import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Power, PowerOff } from "lucide-react";

interface HomeDeviceDialogProps {
  roomName: string;
  action: "open" | "close";
  deviceType: "light" | "blind" | "shutter" | "garden" | "garage";
  controlDeviceText: string;
  onStatusUpdate?: () => void; // Yeni eklenen prop
}

export const HomeDeviceDialog: React.FC<HomeDeviceDialogProps> = ({
  roomName,
  action,
  deviceType,
  controlDeviceText,
  onStatusUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeviceControl = async () => {
    try {
      const response = await fetch("http://localhost:3535/api/control-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName, action, deviceType }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        const actionText = action === "open" ? "açıldı" : "kapatıldı";
        const successMessage = `${roomName} içindeki ${deviceType} ${actionText}.`;

        toast({
          title: `${
            deviceType.charAt(0).toUpperCase() + deviceType.slice(1)
          } Kontrolü`,
          description: successMessage,
        });

        // onStatusUpdate prop'u varsa çağır
        if (onStatusUpdate) {
          onStatusUpdate();
        }
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    } finally {
      // Dialog kapat
      setIsOpen(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            {action === "open" ? <Power style={{paddingRight:'10px'}}/> : <PowerOff style={{paddingRight:'10px'}}/>}
            {controlDeviceText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`${roomName} için yaptığınız ${controlDeviceText} işleminden emin misiniz?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`Bu işlem, `}
              {`${roomName} için `}
              <span className="text-black dark:text-white">
                {`${controlDeviceText}`}
                {action === "open" ? "acak" : "acak."}.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeviceControl}>
              Devam Et
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
