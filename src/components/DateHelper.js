
// Helper functions revolving around date.

const shortDayName = (dayNumber) => {
    switch (dayNumber){
        case 0:
            return "Sun";
            break;
        case 1:
            return "Mon";
            break;
        case 2:
            return "Tue";
            break;
        case 3:
            return "Wed";
            break;
        case 4:
            return "Thu";
            break;
        case 5:
            return "Fri";
            break;
        case 6:
            return "Sat";
            break;
        default:
            return "Huh?";
            break;
    }
}

const fullDayName = (dayNumber) => {
    switch (dayNumber){
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            return "Huh?";
            break;
    }
}


const shortMonthName = (monthNumber) => {
    switch (monthNumber){
        case 0:
            return "Jan";
            break;
        case 1:
            return "Feb";
            break;
        case 2:
            return "Mar";
            break;
        case 3:
            return "Apr";
            break;
        case 4:
            return "May";
            break;
        case 5:
            return "Jun";
            break;
        case 6:
            return "Jul";
            break;
        case 7:
            return "Aug";
            break;
        case 8:
            return "Sep";
            break;
        case 9:
            return "Oct";
            break;
        case 10:
            return "Nov";
            break;
        case 11:
            return "Dec";
            break;
        default:
            return "Huh?";
            break;
    }
}

const fullMonthName = (monthNumber) => {
    switch (monthNumber){
        case 0:
            return "January";
            break;
        case 1:
            return "February";
            break;
        case 2:
            return "March";
            break;
        case 3:
            return "April";
            break;
        case 4:
            return "May";
            break;
        case 5:
            return "June";
            break;
        case 6:
            return "July";
            break;
        case 7:
            return "August";
            break;
        case 8:
            return "September";
            break;
        case 9:
            return "October";
            break;
        case 10:
            return "November";
            break;
        case 11:
            return "December";
            break;
        default:
            return "Huh?";
            break;
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