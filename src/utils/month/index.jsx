const month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

export const fullMonth = [];
fullMonth[0] = "January";
fullMonth[1] = "February";
fullMonth[2] = "March";
fullMonth[3] = "April";
fullMonth[4] = "May";
fullMonth[5] = "June";
fullMonth[6] = "July";
fullMonth[7] = "August";
fullMonth[8] = "September";
fullMonth[9] = "October";
fullMonth[10] = "November";
fullMonth[11] = "December";

export default function getMonth(value) {
    return month[value];
}

export function getFullMonth(value) {
    return fullMonth[value];
}

export function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}