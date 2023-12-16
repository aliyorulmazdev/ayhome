"use client";

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
import { Thermometer } from "lucide-react";

interface RoomTemperatureAlertDialogProps {
  roomName: string;
}

export const RoomTemperatureAlertDialog: React.FC<
  RoomTemperatureAlertDialogProps
> = ({ roomName }) => {
  const handleTemperatureCheck = async () => {
    try {
      const response = await fetch(
        "http://localhost:3535/api/temperature-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // API'den dönen mesajı konsola yazdır
        const temperatureMessage = `The temperature in the ${roomName} is ${result.temperature} degrees.`;

        toast({
          title: "Temperature Check",
          description: temperatureMessage,
        });
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            <Thermometer />
            Measure Temperature
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Check the temperature in the ${roomName}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              {`This action will check the temperature in the ${roomName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTemperatureCheck}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
