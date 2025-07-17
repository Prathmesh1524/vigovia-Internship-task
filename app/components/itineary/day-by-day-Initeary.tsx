"use client"

import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/lable"
import { Textarea } from "../../ui/textarea"
import { MapPin } from "lucide-react"
import { ActivitiesSection } from "./activity-section"
import { TransfersSection } from "./transfer-section"
import { FlightsSection } from "./flight-section"
import type { Day, Activity, Transfer, Flights } from "../../types/itinery"

interface DayByDayItineraryProps {
  days: Day[]
  currentDay: number
  setCurrentDay: (day: number) => void
  addActivity: (dayIndex: number) => void
  updateActivity: (dayIndex: number, activityId: string, field: keyof Activity, value: string | number) => void
  removeActivity: (dayIndex: number, activityId: string) => void
  addTransfer: (dayIndex: number) => void
  updateTransfer: (dayIndex: number, transferId: string, field: keyof Transfer, value: string | number) => void
  removeTransfer: (dayIndex: number, transferId: string) => void
  addFlight: (dayIndex: number) => void
  updateFlight: (dayIndex: number, flightId: string, field: keyof Flights, value: string | number) => void
  removeFlight: (dayIndex: number, flightId: string) => void
  updateDayNotes: (dayIndex: number, notes: string) => void
}

export function DayByDayItinerary({
  days,
  currentDay,
  setCurrentDay,
  addActivity,
  updateActivity,
  removeActivity,
  addTransfer,
  updateTransfer,
  removeTransfer,
  addFlight,
  updateFlight,
  removeFlight,
  updateDayNotes,
}: DayByDayItineraryProps) {
  const updateDayDate = (dayIndex: number, date: string) => {
    // This would be handled by the parent component
    // For now, we'll implement it directly
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {days.map((_, index) => (
          <Button
            key={index}
            variant={currentDay === index ? "default" : "outline"}
            onClick={() => setCurrentDay(index)}
            className="min-w-[80px]"
          >
            Day {index + 1}
          </Button>
        ))}
      </div>

      {days[currentDay] && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Day {currentDay + 1} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`date-${currentDay}`}>Date</Label>
                <Input
                  id={`date-${currentDay}`}
                  type="date"
                  value={days[currentDay].date}
                  onChange={(e) => updateDayDate(currentDay, e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <ActivitiesSection
            activities={days[currentDay].activities}
            onAddActivity={() => addActivity(currentDay)}
            onUpdateActivity={(activityId, field, value) => updateActivity(currentDay, activityId, field, value)}
            onRemoveActivity={(activityId) => removeActivity(currentDay, activityId)}
          />

          <TransfersSection
            transfers={days[currentDay].transfers}
            onAddTransfer={() => addTransfer(currentDay)}
            onUpdateTransfer={(transferId, field, value) => updateTransfer(currentDay, transferId, field, value)}
            onRemoveTransfer={(transferId) => removeTransfer(currentDay, transferId)}
          />

          <FlightsSection
            flights={days[currentDay].flight}
            onAddFlight={() => addFlight(currentDay)}
            onUpdateFlight={(flightId, field, value) => updateFlight(currentDay, flightId, field, value)}
            onRemoveFlight={(flightId) => removeFlight(currentDay, flightId)}
          />

          <Card>
            <CardHeader>
              <CardTitle>Day Notes</CardTitle>
              <CardDescription>Additional notes or special instructions for this day</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Remember to bring comfortable walking shoes for the city tour..."
                value={days[currentDay].notes}
                onChange={(e) => updateDayNotes(currentDay, e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
