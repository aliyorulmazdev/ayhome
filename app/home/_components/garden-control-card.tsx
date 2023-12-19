"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { RoomTemperatureCard } from "./room-temperature-card";
import { GardenWateringDialog } from "./home-garden-watering-dialog";

interface GardenControlCardProps {
  gardenName: string;
}

export function GardenControlCard({ gardenName }: GardenControlCardProps) {
  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${gardenName} Control Center`}
      </CardTitle>
      <CardContent className="flex flex-col items-center">
        {/* First row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          <GardenWateringDialog
            gardenName={gardenName}
            action="start"
            controlWateringText={`Turn Watering On`}
          />
           <div className="ml-3"></div>
           <GardenWateringDialog
            gardenName={gardenName}
            action="stop"
            controlWateringText={`Turn Watering Off`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <RoomTemperatureCard roomName={gardenName} />
      </CardFooter>
    </Card>
  );
}
