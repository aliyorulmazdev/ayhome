"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { GarageDoorControlDialog } from "./garage-door-control-dialog";
import { RoomTemperatureCard } from "./room-temperature-card";

interface GarageControlCardProps {
  garageName: string;
}

export function GarageControlCard({ garageName }: GarageControlCardProps) {
  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${garageName} Control Center`}
      </CardTitle>
      <CardContent className="flex flex-col items-center">
        {/* First row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          <GarageDoorControlDialog
            garageName={garageName}
            action="open"
            controlGarageDoorText={`Open Garage Door`}
          />
          <div className="ml-3"></div>
          <GarageDoorControlDialog
            garageName={garageName}
            action="close"
            controlGarageDoorText={`Close Garage Door`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
