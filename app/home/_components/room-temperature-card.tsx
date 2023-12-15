"use client";

import * as React from "react";
import { BellIcon } from "lucide-react";
import { RoomTemperatureAlertDialog } from "./room-temperature-alert-dialog";

interface RoomControlCardProps {
  roomName: string;
}

export function RoomTemperatureCard({ roomName }: RoomControlCardProps) {
  return (
    <div className="flex items-center space-x-4 rounded-md p-4">
    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium leading-none">Temperature</p>
      <p className="text-sm text-muted-foreground">
        Calculate room temperature
      </p>
    </div>
    <RoomTemperatureAlertDialog roomName={roomName} />
  </div>
  );
}
