// convert string time 00:00:00 or 00:00 to number in seconds, if not in format return -1
export const timeStringToNumber = (time) => {
    let hour = 0;
    let min = 0;
    let sec = 0;

    if (time.length === 8){
        hour = Number(time.substring(0,2));
        min = Number(time.substring(3,5));
        sec = Number(time.substring(6,8));
        return (hour * 3600) + (min * 60) + sec;
    }

    if (time.length === 5){
        min = Number(time.substring(0,2));
        sec = Number(time.substring(3,5));
        return (min * 60) + sec
    }

    return -1;
}

// tests
// console.log("Expect 60 return: " + timeStringToNumber("01:00"));
// console.log("Expect -1 return: " + timeStringToNumber("1:00"));
// console.log("Expect 150 return: " + timeStringToNumber("02:30"));
// console.log("Expect 3600 return: " + timeStringToNumber("01:00:00"));
// console.log("Expect 3750 return: " + timeStringToNumber("01:02:30"));
// console.log("Expect -1 return: " + timeStringToNumber("1:00:00"));