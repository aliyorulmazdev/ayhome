// "use client";
import React from "react";
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
import { Droplet, EggOff } from "lucide-react"; // Örnek ikonlar, kullanılan ikonlara göre değiştirilebilir

interface GardenWateringDialogProps {
  gardenName: string;
  action: 'start' | 'stop';
  controlWateringText: string;
}

export const GardenWateringDialog: React.FC<GardenWateringDialogProps> = ({ gardenName, action, controlWateringText }) => {
  const handleWateringControl = async () => {
    try {
      const response = await fetch('http://localhost:3535/api/watering-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gardenName, action }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        const actionText = action === 'start' ? 'started' : 'stopped';
        const successMessage = `Watering in the ${gardenName} has been ${actionText}.`;

        toast({
          title: 'Watering Control',
          description: successMessage,
        });
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            {action === 'start' ? <Droplet /> : <EggOff />}
            {controlWateringText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you sure you want to ${action} watering in the ${gardenName}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`This action will `}
              <span className="text-black dark:text-white">{`${action} watering`}</span>
              {` in the ${gardenName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleWateringControl}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
