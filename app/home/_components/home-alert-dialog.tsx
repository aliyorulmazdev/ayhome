"use client"

import React from 'react';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Lightbulb, LightbulbOff } from 'lucide-react';

interface HomeAlertDialogProps {
  roomName: string;
  action: 'on' | 'off';
  controlLightsText: string;
}

export const HomeAlertDialog: React.FC<HomeAlertDialogProps> = ({ roomName, action, controlLightsText }) => {
  const handleLightControl = async () => {
    try {
      const response = await fetch('http://localhost:3535/api/light-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName, action }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // API'den dönen mesajı konsola yazdır
        const actionText = action === 'on' ? 'turned on' : 'turned off';
        const successMessage = `The lights in the ${roomName} have been ${actionText}.`;

        toast({
          title: 'Light Control',
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
            {action === 'on' ? <Lightbulb /> : <LightbulbOff />}
            {controlLightsText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you sure you want to ${action} the lights in the ${roomName}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`This action will `}
              <span className="text-black dark:text-white">{`${action} the lights`}</span>
              {` in the ${roomName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLightControl}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
