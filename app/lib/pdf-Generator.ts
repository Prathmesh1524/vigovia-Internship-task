import jsPDF from "jspdf"
import type { IternaryDetails, Day } from "../types/itinery"

export const generatePDF = async (tripDetails: IternaryDetails, days: Day[]) => {
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let yPosition = 20

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      pdf.addPage()
      yPosition = 20
      addFooter()
    }
  }

  // Helper function to add footer
  const addFooter = () => {
    const footerY = pageHeight - 15
    pdf.setFontSize(8)
    pdf.setTextColor(100, 100, 100)
    pdf.text("Travel Itinerary Generator | contact@travelgen.com | +1 (555) 123-4567", pageWidth / 2, footerY, {
      align: "center",
    })
  }

  // Header
  pdf.setFontSize(24)
  pdf.setTextColor(0, 0, 0)
  pdf.text(tripDetails.title || "Travel Itinerary", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 15

  pdf.setFontSize(16)
  pdf.setTextColor(100, 100, 100)
  pdf.text(tripDetails.destination || "Destination", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Trip Overview
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  pdf.text("TRIP OVERVIEW", 20, yPosition)
  yPosition += 10

  pdf.setFontSize(10)
  const overviewData = [
    `Client: ${tripDetails.ClientName}`,
    `Email: ${tripDetails.ClientEmail}`,
    `Phone: ${tripDetails.ClientPhone}`,
    `Duration: ${tripDetails.noOfdays} days`,
    `Travelers: ${tripDetails.travelers} people`,
    `Budget: $${tripDetails.TotalBudget}`,
    `Dates: ${tripDetails.StartDate} to ${tripDetails.EndDate}`,
  ]

  overviewData.forEach((item) => {
    checkPageBreak(8)
    pdf.text(item, 20, yPosition)
    yPosition += 6
  })

  yPosition += 10

  // Daily Itinerary
  days.forEach((day, dayIndex) => {
    checkPageBreak(20)

    // Day Header
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`DAY ${day.dayNumber}`, 20, yPosition)
    if (day.date) {
      pdf.setFontSize(12)
      pdf.setTextColor(100, 100, 100)
      pdf.text(new Date(day.date).toLocaleDateString(), 80, yPosition)
    }
    yPosition += 15

    // Flights
    if (day.flight.length > 0) {
      checkPageBreak(15)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      pdf.text("✈ FLIGHTS", 25, yPosition)
      yPosition += 8

      day.flight.forEach((flight) => {
        checkPageBreak(20)
        pdf.setFontSize(10)
        pdf.text(`${flight.airline} ${flight.flightNumber}`, 30, yPosition)
        yPosition += 5
        pdf.text(`${flight.from} → ${flight.to}`, 30, yPosition)
        yPosition += 5
        pdf.text(`Departure: ${flight.departureTime} | Arrival: ${flight.arrivalTime}`, 30, yPosition)
        yPosition += 5
        pdf.text(`Price: $${flight.price}`, 30, yPosition)
        yPosition += 8
      })
    }

    // Activities
    if (day.activities.length > 0) {
      checkPageBreak(15)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      pdf.text("🎯 ACTIVITIES", 25, yPosition)
      yPosition += 8

      day.activities.forEach((activity) => {
        checkPageBreak(25)
        pdf.setFontSize(11)
        pdf.setFont(undefined, "bold")
        pdf.text(`${activity.date} - ${activity.name}`, 30, yPosition)
        yPosition += 6

        pdf.setFont(undefined, "normal")
        pdf.setFontSize(9)
        if (activity.Location) {
          pdf.text(`📍 ${activity.Location}`, 30, yPosition)
          yPosition += 5
        }
      
        if (activity.price > Number(0)) {
          pdf.text(`💰 Price: $${activity.price}`, 30, yPosition)
          yPosition += 5
        }
        if (activity.des) {
          const descLines = pdf.splitTextToSize(activity.des, pageWidth - 60)
          descLines.forEach((line: string) => {
            checkPageBreak(5)
            pdf.text(line, 30, yPosition)
            yPosition += 4
          })
        }
        yPosition += 5
      })
    }

    // Transfers
    if (day.transfers.length > 0) {
      checkPageBreak(15)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      pdf.text("🚗 TRANSFERS", 25, yPosition)
      yPosition += 8

      day.transfers.forEach((transfer) => {
        checkPageBreak(20)
        pdf.setFontSize(10)
        pdf.text(`${transfer.time} - ${transfer.type.toUpperCase()}`, 30, yPosition)
        yPosition += 5
        pdf.text(`${transfer.from} → ${transfer.to}`, 30, yPosition)
        yPosition += 5
        if (transfer.duration) {
          pdf.text(`Duration: ${transfer.duration}`, 30, yPosition)
          yPosition += 5
        }
        pdf.text(`Price: $${transfer.price} | Max ${transfer.maxPeople} people`, 30, yPosition)
        yPosition += 8
      })
    }

    // Day Notes
    if (day.notes) {
      checkPageBreak(15)
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      pdf.text("📝 NOTES", 25, yPosition)
      yPosition += 8

      pdf.setFontSize(9)
      const noteLines = pdf.splitTextToSize(day.notes, pageWidth - 60)
      noteLines.forEach((line: string) => {
        checkPageBreak(5)
        pdf.text(line, 30, yPosition)
        yPosition += 4
      })
    }

    yPosition += 15
  })

  // Calculate total cost
  let totalCost = 0
  days.forEach((day) => {
    day.activities.forEach((activity) => (totalCost += activity.price))
    day.transfers.forEach((transfer) => (totalCost += transfer.price))
    day.flight.forEach((flight) => (totalCost += flight.price))
  })

  // Cost Summary
  checkPageBreak(30)
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  pdf.text("COST SUMMARY", 20, yPosition)
  yPosition += 10

  pdf.setFontSize(12)
  pdf.text(`Total Estimated Cost: $${totalCost}`, 20, yPosition)
  yPosition += 6
  pdf.text(`Budget: $${tripDetails.TotalBudget}`, 20, yPosition)
  yPosition += 6
  const remaining = tripDetails.TotalBudget - totalCost
  pdf.setTextColor(remaining >= 0 ? 0 : 255, remaining >= 0 ? 150 : 0, 0)
  pdf.text(`${remaining >= 0 ? "Remaining" : "Over Budget"}: $${Math.abs(remaining)}`, 20, yPosition)

  // Add footer to all pages
  const totalPages = pdf.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    const footerY = pageHeight - 15
    pdf.setFontSize(8)
    pdf.setTextColor(100, 100, 100)
    pdf.text("Travel Itinerary Generator | contact@travelgen.com | +1 (555) 123-4567", pageWidth / 2, footerY, {
      align: "center",
    })
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 20, footerY, { align: "right" })
  }

  // Save the PDF
  const fileName = `${tripDetails.title || "Travel-Itinerary"}-${new Date().toISOString().split("T")[0]}.pdf`
  pdf.save(fileName)
}
