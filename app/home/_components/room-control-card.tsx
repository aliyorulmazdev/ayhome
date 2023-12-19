// "use client";
import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { HomeAlertDialog } from "./home-alert-dialog";
import { RoomTemperatureCard } from "./room-temperature-card";
import { HomeShutterDialog } from "./home-shutter-dialog";
import { HomeBlindDialog } from "./home-blind-dialog";
import { GardenWateringDialog } from "./home-garden-watering-dialog";

interface RoomControlCardProps {
  roomName: string;
}

export function RoomControlCard({ roomName }: RoomControlCardProps) {
  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${roomName} Control Center`}
      </CardTitle>
      <CardContent className="flex flex-col items-center">
        {/* First row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          <HomeShutterDialog
            roomName={roomName}
            action="open"
            controlShuttersText={`Turn Shutters On`}
          />
           <div className="ml-3"></div>
          <HomeShutterDialog
            roomName={roomName}
            action="close"
            controlShuttersText={`Turn Shutters Off`}
          />
        </div>
        {/* Separator */}
        <div className="w-full border-t my-4"></div>
        {/* Second row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          <HomeAlertDialog
            roomName={roomName}
            action="on"
            controlLightsText={`Turn Lights On`}
          />
          <div className="ml-3"></div>
          <HomeAlertDialog
            roomName={roomName}
            action="off"
            controlLightsText={`Turn Lights Off`}
          />
        </div>
                {/* Separator */}
                <div className="w-full border-t my-4"></div>
        {/* Second row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          <HomeBlindDialog
            roomName={roomName}
            action="open"
            controlBlindsText={`Turn Blinds On`}
          />
          <div className="ml-3"></div>
          <HomeBlindDialog
            roomName={roomName}
            action="close"
            controlBlindsText={`Turn Blinds Off`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <RoomTemperatureCard roomName={roomName} />
      </CardFooter>
    </Card>
  );
}
