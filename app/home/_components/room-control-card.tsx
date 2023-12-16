// "use client";
import * as React from "react";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { HomeAlertDialog } from "./home-alert-dialog";
import { RoomTemperatureCard } from "./room-temperature-card";

interface RoomControlCardProps {
  roomName: string;
}

export function RoomControlCard({ roomName }: RoomControlCardProps) {
  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${roomName} Lights Control`}
      </CardTitle>
      <CardFooter className="flex justify-between">
        <HomeAlertDialog
          roomName={roomName}
          action="on"
          controlLightsText={`Turn Lights On`}
        />
        <HomeAlertDialog
          roomName={roomName}
          action="off"
          controlLightsText={`Turn Lights Off`}
        />
      </CardFooter>
      <RoomTemperatureCard  roomName={roomName}/>
    </Card>
  );
}
