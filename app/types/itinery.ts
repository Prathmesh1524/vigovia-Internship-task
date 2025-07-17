   
   
   export interface Activity{
        name: string,
        id: string,
        des: string,
        date : string,  
        price : number,
        Location: string
        time: string,
        duration : string
    }

    export  interface Transfer {
    id: string    
    type: string
    from: string
    to: string
    time: string
    duration: string
    price: number
    maxPeople: number
    }


    export interface Flights {
    id: string
    airline: string
    flightNumber: string
    from: string
    to: string
    departureTime: string
    arrivalTime: string
    price: number
    }

    export  interface Day{
        dayNumber : number,
        date : string,
        activities: Activity[],
        transfers: Transfer[],
        flight: Flights[],
        notes: string
    }

    export  interface IternaryDetails{
        title: string,
        destination : string,
        noOfdays: number,
        travelers:number,
        StartDate: string,
        EndDate: string,
        ClientName: string,
        ClientEmail :string,
        ClientPhone: string,
        TotalBudget: number,
    }