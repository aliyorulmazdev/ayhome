"use client";

import { HomeAlertDialog } from "./home-alert-dialog";
import { RoomControlCard } from "./room-control-card";

export const HomeLights = () => {
  const rooms = ["LivingRoom", "Kitchen", "Bedroom", "Hallway"];

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col items-center gap-y-5">
      {rooms.map((room) => (
        <RoomControlCard key={room} roomName={room} />
      ))}
    </div>
  );
};
