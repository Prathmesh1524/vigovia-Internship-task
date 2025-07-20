"use client"
import { useState } from "react"
import { Card, CardContent } from "../../ui/Card"
import { Button } from "@/app/ui/button"
import { Label } from "../../ui/lable"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ItineraryPDF from "../itineary/ItenaryPDF"
import type { IternaryDetails, Day } from "../../types/itinery"

interface GeneratePDFSectionProps {
  tripDetails: IternaryDetails
  days: Day[]
}

export function GeneratePDFSection({ tripDetails, days }: GeneratePDFSectionProps) {
  return (
    <>
      <div className="flex justify-center items-center body p-6 random ">
        <div>
          <p>Hii, {tripDetails.ClientName || "Name"}!</p>
          <p className="font-bold">{tripDetails.destination || "destination"} Itinerary</p>
          <p className="">{tripDetails.noOfdays} days</p>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Trip Title</Label>
              <p className="text-sm text-gray-600">{tripDetails.title || "Not specified"}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Duration</Label>
              <p className="text-sm text-gray-600">{tripDetails.noOfdays} days</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Travelers</Label>
              <p className="text-sm text-gray-600">{tripDetails.travelers} people</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Budget</Label>
              <p className="text-sm text-gray-600">Rs {tripDetails.TotalBudget}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Daily Overview</h4>
            <div className="space-y-2">
              {days.map((day, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>Day {day.dayNumber}</span>
                  <span className="text-gray-600">
                    {day.activities.length} activities, {day.transfers.length} transfers, {day.flight.length} flights
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col justify-center items-center pt-5 title">
        PLAN.PACK.GO!
      </div>

      <div className="flex justify-center mt-4">
        <PDFDownloadLink
          document={<ItineraryPDF tripDetails={tripDetails} days={days} />}
          fileName="travel-itinerary.pdf"
        >
          {({ loading }) =>
            loading ? (
              <Button size="lg" className="px-8 py-3 text-lg btn rounded-3xl" disabled>
                Preparing PDF...
              </Button>
            ) : (
              <Button size="lg" className="px-8 py-3 text-lg btn hover:cursor-pointer rounded-3xl">
                Download Itinerary
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  )
}
