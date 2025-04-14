"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
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
              Error: {location.error || "Fetching location..."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
