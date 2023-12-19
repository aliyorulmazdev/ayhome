"use client";

import { GarageControlCard } from "./garage-control-card";
import { GardenControlCard } from "./garden-control-card";
import { HomeAlertDialog } from "./home-alert-dialog";
import { RoomControlCard } from "./room-control-card";

export const HomeLights = () => {
  const rooms = ["LivingRoom", "Kitchen", "Bedroom", "Hallway"];
  const gardens = ["Front Garden", "Back Garden"];
  const garages = ["Front Garage", "Back Garage"];

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col items-center gap-y-5">
      {rooms.map((room) => (
        <RoomControlCard key={room} roomName={room} />
      ))}
      {garages.map((garage) => (
        <GarageControlCard key={garage} garageName={garage} />
      ))}
      {gardens.map((garden) => (
        <GardenControlCard key={garden} gardenName={garden} />
      ))}
    </div>
  );
};
