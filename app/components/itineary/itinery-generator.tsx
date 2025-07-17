"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { TripDetailsForm } from "./trip-details"
import { DayByDayItinerary } from "./day-by-day-Initeary"
import { GeneratePDFSection } from "./generate-pdf-section"
import { Footer } from "./Footer"
import { Header } from "./header"
import { useTripDetails } from "../../hooks/trip-data"

export function ItineraryGenerator() {
  const {
    IternaryDetails,
    days,
    Currentday,
    setCurrentday,
    UpdateIternaryDetails,
    AddActivity,
    updateActivity,
    removeActivity,
    addTransfer,
    updateTransfer,
    removeTransfer,
    addFlight,
    updateFlight,
    removeFlight,
    updateDayNotes,
  } = useTripDetails()

  return (
    <div className="min-h-screen body">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-6xl mx-auto pt-7">
          <Tabs defaultValue="trip-details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trip-details">Trip Details</TabsTrigger>
              <TabsTrigger value="itinerary">Day-by-Day Itinerary</TabsTrigger>
              <TabsTrigger value="generate">Generate PDF</TabsTrigger>
            </TabsList>

            <TabsContent value="trip-details" className="space-y-6">
              <TripDetailsForm tripDetails={IternaryDetails} updateTripDetails={UpdateIternaryDetails} />
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <DayByDayItinerary
                days={days}
                currentDay={Currentday}
                setCurrentDay={setCurrentday}
                addActivity={AddActivity}
                updateActivity={updateActivity}
                removeActivity={removeActivity}
                addTransfer={addTransfer}
                updateTransfer={updateTransfer}
                removeTransfer={removeTransfer}
                addFlight={addFlight}
                updateFlight={updateFlight}
                removeFlight={removeFlight}
                updateDayNotes={updateDayNotes}
              />
            </TabsContent>

            <TabsContent value="generate" className="space-y-6">
              <GeneratePDFSection tripDetails={IternaryDetails} days={days} />
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </div>
    </div>
  )
}
