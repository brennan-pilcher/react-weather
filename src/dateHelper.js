const shortDayName = (dayNumber) => {
    switch (dayNumber){
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return "Huh?";
    }
}

const fullDayName = (dayNumber) => {
    switch (dayNumber){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Huh?";
    }
}


const shortMonthName = (monthNumber) => {
    switch (monthNumber){
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "Huh?";
    }
}

const fullMonthName = (monthNumber) => {
    switch (monthNumber){
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "Huh?";
    }
}

const dateOrdinal = (dateNumber) => {
    const st = new Set([1, 21, 31]);
    const nd = new Set([2, 22]);
    const rd = new Set([3, 23]);
    const th = new Set([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30 ]);

    if ( st.has(dateNumber) ) { return "st"; }
    else if ( nd.has(dateNumber) ) { return "nd"; }
    else if ( rd.has(dateNumber) ) { return "rd"; }
    else if ( th.has(dateNumber) ) { return "th"; }
    else { return ""; }
}
 
export default {shortDayName, fullDayName, shortMonthName, fullMonthName, dateOrdinal};