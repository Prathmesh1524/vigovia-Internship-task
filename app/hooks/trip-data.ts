// Here we are managing the state in custom hoook called useData
"use client"
import { useState } from "react";
import { Activity,Day,Transfer,Flights,IternaryDetails } from "../types/itinery";
import { setDefaultAutoSelectFamily } from "net";


export function useTripDetails (){

    const [IternaryDetails, setIternaryDetails] = useState<IternaryDetails>({
          title: "",
        destination : "",
        noOfdays: 0,
        travelers: 0,
        StartDate: "",
        EndDate: "",
        ClientName: "",
        ClientEmail :"",
        ClientPhone: "",
        TotalBudget: 0,
    })

    
  const [days, Setdays] = useState <Day[]>([{
    dayNumber : 1,
     date : "",
     activities: [],
     transfers: [],
     flight:[],
     notes: ""
      }])

      const [Currentday, setCurrentday] = useState(0)
      //h Here we are updating the days 
       const UpdateIternaryDetails = (fields: keyof IternaryDetails, value : string| number)=>{
        setIternaryDetails((prev:any)=> ({...prev, [fields]:value}))

        if(value ==="noOfdays"){
            const numDay= Number(value)
            const NewDay = Array.from({length:numDay},(_,i)=>({
                dayNumber : i+1,
                date:"",
                activities: days[i].activities ||[],
                transfers: days[i].transfers || [],
                flight: days[i].flight ||[],
                notes:days[i].date||""

            }))
            Setdays(NewDay)
        }
       }

       const AddActivity = (dayIndex :number) => {
        const NewActivity : Activity = {
        name: "",
          id: "",
          des: "",
          date : "",  
          price : 0,
          Location: "",
          time: "",
          duration : ""
        }
        Setdays((prev)=>
             prev.map((days,index) =>
                 (index === dayIndex ? {...days,activities:[...days.activities,NewActivity] }:days)  ))
       }

          const updateActivity = (dayIndex: number, activityId: string, field: keyof Activity, value: string | number) => {
            Setdays((prev) =>
            prev.map((day, index) =>
            index === dayIndex
            ? {
                ...day,
                activities: day.activities.map((activity) =>
                    activity.id === activityId ? { ...activity, [field]: value } : activity,
                ),
                }
            : day,
      ),
    )
  }

  const removeActivity = (dayIndex: number, activityId: string) => {
    Setdays((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? { ...day, activities: day.activities.filter((activity) => activity.id !== activityId) }
          : day,
      ),
    )
  }
const addTransfer = (dayIndex: number) => {
    const newTransfer: Transfer = {
      id: `transfer-${Date.now()}`,
      type: "",
      from: "",
      to: "",
      time: "",
      duration: "",
      price: 0,
      maxPeople: 1,
    }

    Setdays((prev) =>
      prev.map((day, index) => (index === dayIndex ? { ...day, transfers: [...day.transfers, newTransfer] } : day)),
    )
  }

  const updateTransfer = (dayIndex: number, transferId: string, field: keyof Transfer, value: string | number) => {
    Setdays((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              transfers: day.transfers.map((transfer) =>
                transfer.id === transferId ? { ...transfer, [field]: value } : transfer,
              ),
            }
          : day,
      ),
    )
  }

  const removeTransfer = (dayIndex: number, transferId: string) => {
    Setdays((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? { ...day, transfers: day.transfers.filter((transfer) => transfer.id !== transferId) }
          : day,
      ),
    )
  }

  const addFlight = (dayIndex: number) => {
    const newFlight: Flights = {
      id: `flight-${Date.now()}`,
      airline: "",
      flightNumber: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      price: 0,
    }

    Setdays((prev) =>
      prev.map((day, index) => (index === dayIndex ? { ...day, flights: [...day.flight, newFlight] } : day)),
    )
  }

  const updateFlight = (dayIndex: number, flightId: string, field: keyof Flights, value: string | number) => {
    Setdays((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              flights: day.flight.map((flight) => (flight.id === flightId ? { ...flight, [field]: value } : flight)),
            }
          : day,
      ),
    )
  }

  const removeFlight = (dayIndex: number, flightId: string) => {
    Setdays((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? { ...day, flights: day.flight.filter((flight) => flight.id !== flightId) } : day,
      ),
    )
  }

  const updateDayNotes = (dayIndex: number, notes: string) => {
    Setdays((prev) => prev.map((day, index) => (index === dayIndex ? { ...day, notes } : day)))
  }

 return {
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
  }
}


