"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import useTime from "@/hooks/use-time";

export default function Home() {
  const time = useTime();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  error: null,
                });
              },
              (error) => {
                setLocation({
                  latitude: null,
                  longitude: null,
                  error: error.message,
                });
              }
            );
          } else if (permissionStatus.state === "prompt") {
            setLocation({
              latitude: null,
              longitude: null,
              error: "Location permission not granted.",
            });
          }
        })
        .catch((error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary">
      <Card className="w-full max-w-md rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary">
            GeoClock
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-4xl font-bold text-center">
            {time.toLocaleTimeString()}
          </div>
          {location.latitude && location.longitude ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent" />
                <span>
                  Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
                  {location.longitude.toFixed(5)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-red-500 text-sm">
              {location.error
                ? `Error: ${location.error}`
                : "Location permission not granted."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
