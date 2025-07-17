"use client"

import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/lable";
import { Plane, Plus, Trash2 } from "lucide-react";

type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export function FlightsSection() {
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleAddFlight = () => {
    const newFlight: Flight = {
      id: Date.now().toString(),
      airline: "",
      flightNumber: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      price: 0
    };
    setFlights([...flights, newFlight]);
  };

  const handleUpdateFlight = (flightId: string, field: keyof Flight, value: string | number) => {
    setFlights(flights.map(flight => 
      flight.id === flightId ? { ...flight, [field]: value } : flight
    ));
  };

  const handleRemoveFlight = (flightId: string) => {
    setFlights(flights.filter(flight => flight.id !== flightId));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flights
          </CardTitle>
          <CardDescription className="pt-2">Add flights for this day</CardDescription>
        </div>
        <Button onClick={handleAddFlight} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Flight
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {flights.map((flight, flightIndex) => (
          <div key={flight.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Flight {flightIndex + 1}</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveFlight(flight.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Airline</Label>
                <Input
                  placeholder="Air France"
                  value={flight.airline}
                  onChange={(e) => handleUpdateFlight(flight.id, "airline", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Flight Number</Label>
                <Input
                  placeholder="AF123"
                  value={flight.flightNumber}
                  onChange={(e) => handleUpdateFlight(flight.id, "flightNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  placeholder="JFK - New York"
                  value={flight.from}
                  onChange={(e) => handleUpdateFlight(flight.id, "from", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  placeholder="CDG - Paris"
                  value={flight.to}
                  onChange={(e) => handleUpdateFlight(flight.id, "to", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Departure Time</Label>
                <Input
                  type="time"
                  value={flight.departureTime}
                  onChange={(e) => handleUpdateFlight(flight.id, "departureTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Arrival Time</Label>
                <Input
                  type="time"
                  value={flight.arrivalTime}
                  onChange={(e) => handleUpdateFlight(flight.id, "arrivalTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={flight.price}
                  onChange={(e) => handleUpdateFlight(
                    flight.id, 
                    "price", 
                    Number.parseFloat(e.target.value) || 0
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}