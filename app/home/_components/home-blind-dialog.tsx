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
import { Eye, EyeOff } from "lucide-react"; // Örnek ikonlar, kullanılan ikonlara göre değiştirilebilir

interface HomeBlindDialogProps {
  roomName: string;
  action: 'open' | 'close';
  controlBlindsText: string;
}

export const HomeBlindDialog: React.FC<HomeBlindDialogProps> = ({ roomName, action, controlBlindsText }) => {
  const handleBlindControl = async () => {
    try {
      const response = await fetch('http://localhost:3535/api/blind-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName, action }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        const actionText = action === 'open' ? 'opened' : 'closed';
        const successMessage = `The blinds in the ${roomName} have been ${actionText}.`;

        toast({
          title: 'Blind Control',
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
            {action === 'open' ? <Eye /> : <EyeOff />}
            {controlBlindsText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you sure you want to ${action} the blinds in the ${roomName}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`This action will `}
              <span className="text-black dark:text-white">{`${action} the blinds`}</span>
              {` in the ${roomName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlindControl}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
