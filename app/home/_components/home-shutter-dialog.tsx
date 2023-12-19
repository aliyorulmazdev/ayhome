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
import { Lightbulb, LightbulbOff, Power, PowerOff } from 'lucide-react';

// Import necessary components and styles

interface HomeShutterDialogProps {
    roomName: string;
    action: 'open' | 'close'; // Updated actions for shutters
    controlShuttersText: string;
  }
  
  export const HomeShutterDialog: React.FC<HomeShutterDialogProps> = ({ roomName, action, controlShuttersText }) => {
    const handleShutterControl = async () => {
      try {
        const response = await fetch('http://localhost:3535/api/shutter-control', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomName, action }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result.message); // Log the message returned from the API
          const actionText = action === 'open' ? 'opened' : 'closed'; // Updated action text
          const successMessage = `The shutters in the ${roomName} have been ${actionText}.`;
  
          toast({
            title: 'Shutter Control',
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
              {/* Use an icon representing shutters */}
              {action === 'open' ? <Power /> : <PowerOff />}
              {controlShuttersText}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{`Are you sure you want to ${action} the shutters in the ${roomName}?`}</AlertDialogTitle>
              <AlertDialogDescription>
                {`This action will `}
                <span className="text-black dark:text-white">{`${action} the shutters`}</span>
                {` in the ${roomName}.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleShutterControl}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  