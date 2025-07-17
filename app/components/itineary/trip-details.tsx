"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import { Input } from "../../ui/input"

import { Label } from "../../ui/lable"
import type { IternaryDetails } from "../../types/itinery"

interface TripDetailsFormProps {
  tripDetails: IternaryDetails
  updateTripDetails: (field: keyof IternaryDetails, value: string | number) => void
}

export function TripDetailsForm({ tripDetails, updateTripDetails }: TripDetailsFormProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Basic Trip Information</CardTitle>
          <CardDescription>Enter the fundamental details of your trip</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Trip Title</Label>
              <Input
                id="title"
                placeholder="Amazing European Adventure"
                value={tripDetails.title}
                onChange={(e) => updateTripDetails("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Paris, France"
                value={tripDetails.destination}
                onChange={(e) => updateTripDetails("destination", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={tripDetails.StartDate}
                onChange={(e) => updateTripDetails("StartDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={tripDetails.EndDate}
                onChange={(e) => updateTripDetails("EndDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfDays">Number of Days</Label>
              <Input
                id="numberOfDays"
                type="number"
                min="1"
                max="30"
                value={tripDetails.noOfdays}
                onChange={(e) => updateTripDetails("noOfdays", Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Input
                id="travelers"
                type="number"
                min="1"
                value={tripDetails.travelers}
                onChange={(e) => updateTripDetails("travelers", Number.parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Details of the primary traveler</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Your Name</Label>
              <Input
                id="clientName"
                placeholder="John Doe"
                value={tripDetails.ClientName}
                onChange={(e) => updateTripDetails("ClientName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="john@example.com"
                value={tripDetails.ClientEmail}
                onChange={(e) => updateTripDetails("ClientEmail", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone</Label>
              <Input
                id="clientPhone"
                placeholder="+1 (555) 123-4567"
                value={tripDetails.ClientPhone}
                onChange={(e) => updateTripDetails("ClientPhone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalBudget">Total Budget (Rs)</Label>
              <Input
                id="totalBudget"
                type="number"
                min="0"
                placeholder="5000"
                value={tripDetails.TotalBudget}
                onChange={(e) => updateTripDetails("TotalBudget", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
