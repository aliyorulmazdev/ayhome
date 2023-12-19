import * as React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { RoomTemperatureCard } from "./room-temperature-card";
import { HomeDeviceDialog } from "./home-device-dialog";

interface RoomControlCardProps {
  roomName: string;
}

export function RoomControlCard({ roomName }: RoomControlCardProps) {
  const [lightStatus, setLightStatus] = React.useState<string | null>(null);
  const [blindStatus, setBlindStatus] = React.useState<string | null>(null);
  const [shutterStatus, setShutterStatus] = React.useState<string | null>(null);

  const fetchDeviceStatus = async (deviceType: string) => {
    try {
      const response = await fetch(
        "http://localhost:3535/api/get-device-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName, deviceType }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const actionText =
            result.data.action === "open" ? "Opened" : "Closed";

          switch (deviceType) {
            case "light":
              setLightStatus(`Last status for Lights: ${actionText}`);
              break;
            case "blind":
              setBlindStatus(`Last status for Blinds: ${actionText}`);
              break;
            case "shutter":
              setShutterStatus(`Last status for Shutters: ${actionText}`);
              break;
            default:
              break;
          }
        } else {
          switch (deviceType) {
            case "light":
              setLightStatus(`No data found for Lights`);
              break;
            case "blind":
              setBlindStatus(`No data found for Blinds`);
              break;
            case "shutter":
              setShutterStatus(`No data found for Shutters`);
              break;
            default:
              break;
          }
        }
      } else {
        switch (deviceType) {
          case "light":
            setLightStatus(`Error fetching device status for Lights`);
            break;
          case "blind":
            setBlindStatus(`Error fetching device status for Blinds`);
            break;
          case "shutter":
            setShutterStatus(`Error fetching device status for Shutters`);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      switch (deviceType) {
        case "light":
          setLightStatus(`Error during API request for Lights`);
          break;
        case "blind":
          setBlindStatus(`Error during API request for Blinds`);
          break;
        case "shutter":
          setShutterStatus(`Error during API request for Shutters`);
          break;
        default:
          break;
      }
      console.error(`Error during API request for ${deviceType}:`, error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchDeviceStatus("light");
      await fetchDeviceStatus("blind");
      await fetchDeviceStatus("shutter");
    };

    fetchData();
  }, [fetchDeviceStatus]);

  return (
    <Card>
      <CardTitle className="text-lg font-semibold m-2">
        {`${roomName} Kontrol Merkezi`}
      </CardTitle>
      <CardContent className="flex flex-col items-center">
        {/* First row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          {shutterStatus && (
            <>
              {shutterStatus.includes("Closed") && (
                <HomeDeviceDialog
                  roomName={roomName}
                  action="open"
                  deviceType="shutter"
                  controlDeviceText={`Prizleri Aç`}
                  onStatusUpdate={() => fetchDeviceStatus("shutter")}
                />
              )}
              {shutterStatus.includes("Open") && (
                <HomeDeviceDialog
                  roomName={roomName}
                  action="close"
                  deviceType="shutter"
                  controlDeviceText={`Prizleri Kapat`}
                  onStatusUpdate={() => fetchDeviceStatus("shutter")}
                />
              )}
            </>
          )}
        </div>

        {/* Separator */}
        <div className="w-full border-t my-4"></div>
        {/* Second row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          {lightStatus && (
            <>
              {lightStatus.includes("Closed") && (
                <HomeDeviceDialog
                  roomName={roomName}
                  action="open"
                  deviceType="light"
                  controlDeviceText={`Işıkları Aç`}
                  onStatusUpdate={() => fetchDeviceStatus("light")}
                />
              )}
              {lightStatus.includes("Open") && (
                <HomeDeviceDialog
                  roomName={roomName}
                  action="close"
                  deviceType="light"
                  controlDeviceText={`Işıkları Kapat`}
                  onStatusUpdate={() => fetchDeviceStatus("light")}
                />
              )}
            </>
          )}
        </div>
        {/* Separator */}
        <div className="w-full border-t my-4"></div>
        {/* Third row with two dialogs on larger screens */}
        <div className="flex lg:flex-wrap justify-center">
          {blindStatus && (
            <>
              {blindStatus.includes("Closed") && (
                <HomeDeviceDialog
                  roomName={roomName}
                  deviceType="blind"
                  action="open"
                  controlDeviceText={`Panjurları Aç`}
                  onStatusUpdate={() => fetchDeviceStatus("blind")}
                />
              )}
              {blindStatus.includes("Open") && (
                <HomeDeviceDialog
                  roomName={roomName}
                  deviceType="blind"
                  action="close"
                  controlDeviceText={`Panjurları Kapat`}
                  onStatusUpdate={() => fetchDeviceStatus("blind")}
                />
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
