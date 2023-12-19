"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { RoomTemperatureCard } from "./room-temperature-card";
import { HomeDeviceDialog } from "./home-device-dialog";

interface GardenControlCardProps {
  gardenName: string;
}
export function GardenControlCard({ gardenName }: GardenControlCardProps) {
  const [gardenStatus, setGardenStatus] = React.useState<string | null>(null);

  const fetchDeviceStatus = async (deviceType: string) => {
    try {
      const response = await fetch(
        "http://localhost:3535/api/get-device-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName: gardenName, deviceType }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        // Log the received data
        console.log(`Received data for ${deviceType}:`, result);

        if (result.success) {
          // Check if result.data exists before accessing its properties
          if (result.data) {
            const actionText =
              result.data.action === "open" ? "Opened" : "Closed";

            switch (deviceType) {
              case "garden":
                setGardenStatus(`Last status for Gardens: ${actionText}`);
                break;
              default:
                break;
            }
          } else {
            // Handle the case when result.data is undefined or null
            setGardenStatus(`No data found for Gardens`);
          }
        } else {
          switch (deviceType) {
            case "garden":
              setGardenStatus(`No data found for Gardens`);
              break;
            default:
              break;
          }
        }
      } else {
        switch (deviceType) {
          case "garden":
            setGardenStatus(`Error fetching device status for Gardens`);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      switch (deviceType) {
        case "garden":
          setGardenStatus(`Error during API request for Gardens`);
          break;
        default:
          break;
      }
      console.error(`Error during API request for ${deviceType}:`, error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchDeviceStatus("garden");
    };

    fetchData();
  }, [fetchDeviceStatus]);

  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${gardenName} Control Center`}
      </CardTitle>
      <CardContent className="flex flex-col items-center">
        {/* First row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          {gardenStatus && (
            <>
              {gardenStatus.includes("Closed") && (
                <HomeDeviceDialog
                  roomName={gardenName}
                  action="open"
                  controlDeviceText={`Turn Watering On`}
                  deviceType="garden"
                  onStatusUpdate={() => fetchDeviceStatus("garden")}
                />
              )}
              {gardenStatus.includes("Open") && (
                <HomeDeviceDialog
                  roomName={gardenName}
                  action="close"
                  controlDeviceText={`Turn Watering Off`}
                  deviceType="garden"
                  onStatusUpdate={() => fetchDeviceStatus("garden")}
                />
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <RoomTemperatureCard roomName={gardenName} />
      </CardFooter>
    </Card>
  );
}
