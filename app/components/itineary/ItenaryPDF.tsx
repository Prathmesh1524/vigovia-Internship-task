import React from "react";
import gradientBackground from "../../assets/bg-img.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
import type { IternaryDetails, Day } from "../../types/itinery";



interface Props {
  tripDetails: IternaryDetails;
  days: Day[];
}

// Styles
const styles = StyleSheet.create({
 page: {
        padding: 30,
        fontSize: 10,
        fontFamily: "Helvetica",
        position: "relative",
      },
      backgroundImage: {
        width: 460,
        height: 260,
        alignSelf: "center",
        borderRadius: 20,
        position: "relative", 
        textAlign: "center",
      },
    headerContainer: {
      position: "relative",
      width: "80%",
      height: 150,
      alignSelf: "center",
      marginBottom:30
    },

    textOverlay: {
      position: 'absolute',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
        LogoImage: {
        width: 200,
        height: 100,
        marginBottom: 20,
        alignSelf: "center", 
          padding: 5,
      },
    tripTitle: {
      fontSize: 22,
      fontWeight: "medium",
      color: "white",
      marginBottom: 4,
    },

      destination: {
        fontSize: 18,
        fontWeight:'semibold',
        color: "white",
      },
      sectionHeader: {
        fontSize: 12,
        marginTop: 14,
        marginBottom: 6,
        textTransform: "uppercase",
        color: "#1a202c",
        fontWeight: "bold",
      },
      text: {
        marginBottom: 3,
        lineHeight: 1.4,
      },
      dayBlock: {
        marginBottom: 12,
        paddingBottom: 6,
        borderBottom: "1px solid #ccc",
      },
      bold: {
        fontWeight: "bold",
      },
      verticalTextBlock: {
        flexDirection: "column", // stack content inside
        alignItems: "flex-start",
        gap:4
      },

        shortinfo: {
        padding: 8,
        borderWidth: 1,
        borderColor: "rgba(84, 28, 156, 1)",
        borderRadius: 10,
        flexDirection: "row",           // 🧭 Row layout
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10,
      },
        infoText: {
          fontSize: 12,
          color: "gray",
          marginBottom: 5,
      },

    // day details

        itineraryDayContainer: {
        flexDirection: "row",
          
        padding: 10,
        marginBottom: 10,
        marginTop:15,
      },
        daySeparator: {
        height: 1,
        backgroundColor: "#ccc",
        marginTop: 10,
        marginHorizontal: 10,
       
    },
      dayLabel: {
        backgroundColor: "#2e1065", 
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
        marginTop:10,
      borderBottomWidth: 1,
    borderBottomColor: "#ccc",
      },
      dayLableImg:{
        width: 100,
        height: 100,
        marginBottom: 20,
        alignSelf: "flex-start", 
          padding: 5,
      },
      dayLabelText: {
        color: "#fff",
        transform: "rotate(-90deg)",
        fontSize: 12,
        fontWeight: "bold",
      },
      leftSection: {
        width: 120,
        alignItems: "center",
        paddingHorizontal: 10,
      },
      dayImage: {
        width: 60,
        height: 80,
        borderRadius: 30,
        marginBottom: 6,
      },
      dateText: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
      },
      subtitleText: {
        fontSize: 10,
        textAlign: "center",
      },
      timelineSection: {
        flex: 1,
        paddingLeft: 20,
        borderLeft: "2px solid #3b82f6",
      },
      timelineItem: {
        marginBottom: 10,
      },
      timelineDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight:20,
      
        position: "absolute",
        left: 50,
        top: 2,
      },
      timelineTitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
      },
      bulletGroup: {
        paddingLeft: 10,
      },
      bulletText: {
        fontSize: 10,
        marginBottom: 2,
      },




       flightCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7e22ce',
    borderRadius: 6,
    overflow: 'hidden', // keeps the rounded corners intact
    marginBottom: 10,
  },

  dateTagContainer: {
    backgroundColor: '#7e22ce',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  FlightdateText: {
    color: '#fff',
    fontSize: 10,
  },

  chevron: {
    position: 'absolute',
    right: -8,
    top: 0,
    bottom: 0,
    width: 8,
  },

  flightDetails: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 12,
    
  },

  flightTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },



   footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9
  },
  footerSection: {
    width: "30%",
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  boldText: {
    fontWeight: "bold",
  },
  logo: {
    width: 70,
    height: 22,
    marginBottom: 2,
  },
  tagline: {
    fontSize: 8,
    color: "#7e22ce",
  }


});

const ItineraryPDF: React.FC<Props> = ({ tripDetails, days }) => {
  // Calculate total cost
  let totalCost = 0;
  days.forEach((day) => {
    day.activities.forEach((a:any) => (totalCost += a.price));
    day.transfers.forEach((t):any => (totalCost += t.price));
    day.flight.forEach((f) :any=> (totalCost += f.price));
  });

  const remaining = tripDetails.TotalBudget - totalCost;

  return (
    <Document>
      <Page  size="A4" style={styles.page} wrap>
        {/* Image */}
              <Image 
    src="/assets/logo.jpg"
    style={styles.LogoImage}
      />
      {/* Header */}
         
       <View style={styles.headerContainer}>
      {/* Background gradient box */}
        <Image src="/assets/bg-img.png" style={styles.backgroundImage} />
        {/* Text inside the gradient */}
        <View style={styles.textOverlay}>
          <Text style={styles.tripTitle}>
            Hii,{tripDetails.ClientName}
          </Text>
          <Text style={styles.destination}>
            {tripDetails.destination || "Destination"},Itinerary
          </Text>
          <Text style={styles.tripTitle}>
            {tripDetails.noOfdays || "1 Day"} ,Days  
          </Text>
        </View>
      </View>

   

{/* The border of information */}
      <View style={styles.shortinfo}>
    {/* Column 1: Departure from + Mumbai (stacked vertically) */}
    <View style={styles.verticalTextBlock}>
      <Text style={styles.infoText}>Departure from ,</Text>
      <Text style={{color:"black"}}>Mumbai</Text>
    </View>

    {/* Column 2: Departure Date */}
    <View style={styles.verticalTextBlock}>
      <Text style={styles.infoText}>Departure</Text>
      <Text style= {{color:"black"}}>{tripDetails.StartDate}</Text>
    </View>


    <View style={styles.verticalTextBlock}>
      <Text style={styles.infoText}>Arrival</Text>
      <Text style={{color:"black"}}>--</Text>
    </View>

    {/* Column 4: Destination */}
    <View style={styles.verticalTextBlock}>
      <Text style={styles.infoText}>Destination</Text>
      <Text style={{color:"black"}}>{tripDetails.destination}</Text>
    </View>

    {/* Column 5: No of Travellers */}
    <View style={styles.verticalTextBlock}>
      <Text style={styles.infoText}>No of Travellers</Text>
      <Text style={{color:"black"}}>{tripDetails.noOfdays}</Text>
    </View>
  </View>




{/* Day by day Iternary */}
      {/* Day 1 */}
      <View style={styles.itineraryDayContainer}>
  {/* Column 1: Day Label */}
  <View style={styles.dayLabel}>
    <Text style={styles.dayLabelText}>Day 1</Text>
  </View>

  {/* Column 2: Image + Date + Title */}
  <View style={styles.leftSection}>
       <Image 
    src="/assets/img1.png"
    style={styles.dayLableImg}
      />
    <Text style={styles.dateText}>27th August</Text>
    <Text style={styles.subtitleText}>Arrival In Singapore & City Exploration</Text>
  </View>

  {/* Column 3: Timeline with Activities */}
  <View style={styles.timelineSection}>
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Morning</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Arrive In Singapore. Transfer From Airport To Hotel.</Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Afternoon</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Check Into Your Hotel.</Text>
        <Text style={styles.bulletText}>• Visit Marina Bay Sands Sky Park (2-3 Hours).</Text>
        <Text style={styles.bulletText}>• Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.</Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Evening</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)</Text>
      </View>
    </View>
  </View>
</View>

{/* Bottom Separator */}
<View style={styles.daySeparator} />

    {/* Day 2 */}
       <View style={styles.itineraryDayContainer}>
  {/* Column 1: Day Label */}
  <View style={styles.dayLabel}>
    <Text style={styles.dayLabelText}>Day 2</Text>
  </View>

  {/* Column 2: Image + Date + Title */}
  <View style={styles.leftSection}>
       <Image 
    src="/assets/img2.png"
    style={styles.dayLableImg}
      />
    <Text style={styles.dateText}>28th August</Text>
    <Text style={styles.subtitleText}>Moving to another city.</Text>
  </View>

  {/* Column 3: Timeline with Activities */}
  <View style={styles.timelineSection}>
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Morning</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Arrive in Singapore. Transfer from Airport to Hotel. </Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Afternoon</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Check Into Your Hotel.</Text>
        <Text style={styles.bulletText}>• Visit Marina Bay Sands Sky Park (2-3 Hours).</Text>
        <Text style={styles.bulletText}>• Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.</Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Evening</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)</Text>
      </View>
    </View>
  </View>
</View>



         {/* Day 3 */}
       <View style={styles.itineraryDayContainer}>
  {/* Column 1: Day Label */}
  <View style={styles.dayLabel}>
    <Text style={styles.dayLabelText}>Day 3</Text>
  </View>

  {/* Column 2: Image + Date + Title */}
  <View style={styles.leftSection}>
       <Image 
    src="/assets/img3.png"
    style={styles.dayLableImg}
      />
    <Text style={styles.dateText}>29th August</Text>
    <Text style={styles.subtitleText}>Moving to another city.</Text>
  </View>

  {/* Column 3: Timeline with Activities */}
  <View style={styles.timelineSection}>
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Morning</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Arrive in Singapore. Transfer from Airport to Hotel. </Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Afternoon</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Check Into Your Hotel.</Text>
        <Text style={styles.bulletText}>• Visit Marina Bay Sands Sky Park (2-3 Hours).</Text>
        <Text style={styles.bulletText}>• Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.</Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Evening</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)</Text>
      </View>
    </View>
  </View>
</View>

<View style={styles.daySeparator} />
        {/* Daily Itinerary */}

         {/* Day 4 */}
       <View style={styles.itineraryDayContainer}>
  {/* Column 1: Day Label */}
  <View style={styles.dayLabel}>
    <Text style={styles.dayLabelText}>Day 4</Text>
  </View>

  {/* Column 2: Image + Date + Title */}
  <View style={styles.leftSection}>
       <Image 
    src="/assets/img3.png"
    style={styles.dayLableImg}
      />
    <Text style={styles.dateText}>30th August</Text>
    <Text style={styles.subtitleText}>Moving to another city.</Text>
  </View>

  {/* Column 3: Timeline with Activities */}
  <View style={styles.timelineSection}>
    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Morning</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Arrive in Singapore. Transfer from Airport to Hotel. </Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Afternoon</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Check Into Your Hotel.</Text>
        <Text style={styles.bulletText}>• Visit Marina Bay Sands Sky Park (2-3 Hours).</Text>
        <Text style={styles.bulletText}>• Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.</Text>
      </View>
    </View>

    <View style={styles.timelineItem}>
      <View style={styles.timelineDot} />
      <Text style={styles.timelineTitle}>Evening</Text>
      <View style={styles.bulletGroup}>
        <Text style={styles.bulletText}>• Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)</Text>
      </View>
    </View>
  </View>
</View>

<View style={styles.daySeparator} />
        {/* Daily Itinerary */}
       

{/* // FlightCard.tsx (React PDF) */}
<View style={styles.flightCard}>
    <View style={styles.dateTagContainer}>
      <Text style={styles.dateText}>Thu 10 Jan’24</Text>
      <View style={styles.chevron}>
      </View>
    </View>

    <View style={styles.flightDetails}>
      <Text style={styles.flightTitle}>Fly Air India</Text>
      <Text>From Mumbai (MUB) To Singapore (SIN).</Text>
    </View>
  </View>


  <View style={styles.flightCard}>
    <View style={styles.dateTagContainer}>
      <Text style={styles.dateText}>Thu 10 Jan’24</Text>
      <View style={styles.chevron}>
      </View>
    </View>

    <View style={styles.flightDetails}>
      <Text style={styles.flightTitle}>Fly Air India</Text>
      <Text>From Mumbai (MUB) To Singapore (SIN).</Text>
    </View>
  </View>


<View style={styles.flightCard}>
    <View style={styles.dateTagContainer}>
      <Text style={styles.dateText}>Thu 10 Jan’24</Text>
      <View style={styles.chevron}>
      </View>
    </View>

    <View style={styles.flightDetails}>
      <Text style={styles.flightTitle}>Fly Air India</Text>
      <Text>From Mumbai (MUB) To Singapore (SIN).</Text>
    </View>
  </View>


        {/* Cost Summary */}
        <Text style={styles.sectionHeader}>Cost Summary</Text>
        <Text style={styles.text}>Total Cost: ${totalCost}</Text>
        <Text style={styles.text}>Budget: ${tripDetails.TotalBudget}</Text>
        <Text style={[styles.text, { color: remaining >= 0 ? "green" : "red" }]}>
          {remaining >= 0 ? "Remaining" : "Over Budget"}: ${Math.abs(remaining)}
        </Text>

        {/* Footer
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Travel Itinerary Generator | contact@travelgen.com | Page ${pageNumber} of ${totalPages}`
          }
          fixed
        /> */}

        <View style={styles.footer} fixed>
    <View style={styles.footerSection}>
      <Text style={styles.boldText}>Vigovia Tech Pvt. Ltd</Text>
      <Text>Hd-109 Cinnabar Hills,</Text>
      <Text>Links Business Park, Karnataka</Text>
    </View>
    <View style={styles.footerSection}>
      <Text><Text style={styles.boldText}>Phone:</Text> +91-99X9999999</Text>
      <Text><Text style={styles.boldText}>Email ID:</Text> Contact@Vigovia.Com</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  <View style={[styles.footerSection, styles.rightAlign]}>
    <Image src="/vigovia-logo.png" style={styles.logo} />
    <Text style={styles.tagline}>PLAN.PACK.GO. ✈️</Text>
  </View>
</View>

      </Page>
    </Document>
  );
};

export default ItineraryPDF;
