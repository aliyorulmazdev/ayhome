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
import { DoorOpen, DoorClosed } from "lucide-react"; // Örnek ikonlar, kullanılan ikonlara göre değiştirilebilir

interface GarageDoorControlDialogProps {
  garageName: string;
  action: 'open' | 'close';
  controlGarageDoorText: string;
}

export const GarageDoorControlDialog: React.FC<GarageDoorControlDialogProps> = ({ garageName, action, controlGarageDoorText }) => {
  const handleGarageDoorControl = async () => {
    try {
      const response = await fetch('http://localhost:3535/api/garage-door-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ garageName, action }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        const actionText = action === 'open' ? 'opened' : 'closed';
        const successMessage = `Garage door in the ${garageName} has been ${actionText}.`;

        toast({
          title: 'Garage Door Control',
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
            {action === 'open' ? <DoorOpen /> : <DoorClosed />}
            {controlGarageDoorText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you sure you want to ${action} the garage door in the ${garageName}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`This action will `}
              <span className="text-black dark:text-white">{`${action} the garage door`}</span>
              {` in the ${garageName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleGarageDoorControl}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
