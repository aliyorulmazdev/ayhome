"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowRightIcon } from "lucide-react";
import { HomeAlertDialog } from "./home-alert-dialog";

export const HomeLights = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
    <div className="flex space-x-4">
      <HomeAlertDialog
        roomName="LivingRoom"
        action="on"
        controlLightsText="Turn on the lights of Living Room"
      />
      <HomeAlertDialog
        roomName="LivingRoom"
        action="off"
        controlLightsText="Turn off the lights of Living Room"
      />
    </div>

    <div className="flex space-x-4">
      <HomeAlertDialog
        roomName="Kitchen"
        action="on"
        controlLightsText="Turn on the lights of Kitchen"
      />
      <HomeAlertDialog
        roomName="Kitchen"
        action="off"
        controlLightsText="Turn off the lights of Kitchen"
      />
    </div>

    <div className="flex space-x-4">
      <HomeAlertDialog
        roomName="Bedroom"
        action="on"
        controlLightsText="Turn on the lights of Bedroom"
      />
      <HomeAlertDialog
        roomName="Bedroom"
        action="off"
        controlLightsText="Turn off the lights of Bedroom"
      />
    </div>

    <div className="flex space-x-4">
      <HomeAlertDialog
        roomName="Hallway"
        action="on"
        controlLightsText="Turn on the lights of Hallway"
      />
      <HomeAlertDialog
        roomName="Hallway"
        action="off"
        controlLightsText="Turn off the lights of Hallway"
      />
    </div>
  </div>
  );
};
