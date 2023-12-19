"use client";

import * as React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HomeDeviceDialog } from "./home-device-dialog";

interface GarageControlCardProps {
  garageName: string;
}

export function GarageControlCard({ garageName }: GarageControlCardProps) {
  const [garageStatus, setGarageStatus] = React.useState<string | null>(null);

  const fetchDeviceStatus = async (deviceType: string) => {
    try {
      const response = await fetch(
        "http://localhost:3535/api/get-device-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName: garageName, deviceType }),
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
              case "garage":
                setGarageStatus(`Last status for Garages: ${actionText}`);
                break;
              default:
                break;
            }
          } else {
            // Handle the case when result.data is undefined or null
            setGarageStatus(`No data found for Garages`);
          }
        } else {
          switch (deviceType) {
            case "garage":
              setGarageStatus(`No data found for Garages`);
              break;
            default:
              break;
          }
        }
      } else {
        switch (deviceType) {
          case "garage":
            setGarageStatus(`Error fetching device status for Garages`);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      switch (deviceType) {
        case "garage":
          setGarageStatus(`Error during API request for Garages`);
          break;
        default:
          break;
      }
      console.error(`Error during API request for ${deviceType}:`, error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchDeviceStatus("garage");
    };

    fetchData();
  }, [fetchDeviceStatus]);
  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${garageName} Control Center`}
      </CardTitle>
      <CardContent className="flex flex-col items-center">
        {/* First row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          {garageStatus && (
            <>
              {garageStatus.includes("Closed") && (
                <HomeDeviceDialog
                  roomName={garageName}
                  action="open"
                  controlDeviceText="Open Garage Door"
                  deviceType="garage"
                  onStatusUpdate={() => fetchDeviceStatus("garage")}
                />
              )}
              {garageStatus.includes("Open") && (
                <>
                  <div className="ml-3"></div>
                  <HomeDeviceDialog
                    roomName={garageName}
                    action="close"
                    controlDeviceText="Close Garage Door"
                    deviceType="garage"
                    onStatusUpdate={() => fetchDeviceStatus("garage")}
                  />
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
