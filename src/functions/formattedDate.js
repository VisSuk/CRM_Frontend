const months_numtoName = [
    { month_number: "01", month_Name: "Jan" },
    { month_number: "02", month_Name: "Feb" },
    { month_number: "03", month_Name: "Mar" },
    { month_number: "04", month_Name: "Apr" },
    { month_number: "05", month_Name: "May" },
    { month_number: "06", month_Name: "Jun" },
    { month_number: "07", month_Name: "Jul" },
    { month_number: "08", month_Name: "Aug" },
    { month_number: "09", month_Name: "Sep" },
    { month_number: "10", month_Name: "Oct" },
    { month_number: "11", month_Name: "Nov" },
    { month_number: "12", month_Name: "Dec" }
];

export const getFormattedDate = (date) => {

        // console.log(date)
        const dateString = String(date)
        const dateArray = dateString.substring(0, 10).split("-")
        const year = dateArray[0]
        const month = dateArray[1]
        const day = dateArray[2]

        let day_ordinalIndicator

        const monthAbbreviation = months_numtoName.find((item) => item.month_number == month).month_Name
        // console.log(monthName);

        if(day == "11" || day == "12" || day == "13"){
            day_ordinalIndicator = "th"
        }
        else if (day.substring(1) == "1"){
            day_ordinalIndicator = "st"
        }
        else if (day.substring(1) == "2"){
            day_ordinalIndicator = "nd"
        }
        else if (day.substring(1) == "3"){
            day_ordinalIndicator = "rd"
        }
        else{
            day_ordinalIndicator = "th"
        }

        const formattedDate_String = `${day}${day_ordinalIndicator}  ${monthAbbreviation}  ${year}`
        // console.log(formattedDate_String)

        return formattedDate_String
        
    }