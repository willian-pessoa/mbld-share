// receive a string and verify if is in the format 00:00:00, 0:00:00, 00:00, 0:00
// return a tuple with [true, time in seconds] or [false, -1]
export const isFormatTime = (time) =>{
    let tempTime = time.replace(/\s/g, '');
    let min = 0;
    let sec = 0;
    let hour = 0;

    // check number values
    // check 00:00
    if (time[2] === ":" && time.length === 5) {
        min = Number(tempTime.substring(0,2));
        sec = Number(tempTime.substring(3,5));
        if (Number.isInteger(min) && Number.isInteger(sec)){
            if(min > 60 || min < 0){
                return [false, -1];
            }
            let timeInSeconds = (min * 60) + sec
            return [true, timeInSeconds];
        } else {
            return [false, -1];
        }
    } 
    // check 00:00:00
    if (time[2] === ":" && time[5] === ":" && time.length === 8){
        hour = Number(tempTime.substring(0,2));
        min = Number(tempTime.substring(3,5));
        sec = Number(tempTime.substring(6,8));
        if (Number.isInteger(min) && Number.isInteger(sec) && Number.isInteger(hour)){
            let timeInSeconds = (hour * 60 * 60) + (min * 60) + sec
            if(min > 60 || hour > 24){
                return [false, -1];
            }
            return [true, timeInSeconds];
        } else {
            return [false, -1];
        }
    }

    // check 0:00
    if (time[1] === ":" && time.length === 4) {
        min = Number(tempTime[0]);
        sec = Number(tempTime.substring(2,4));
        if (Number.isInteger(min) && Number.isInteger(sec)){
            let timeInSeconds = (min * 60) + sec
            return [true, timeInSeconds];
        } else {
            return [false, -1];
        }
    }
    
    // check 0:00:00
    if (time[1] === ":" && time[4] === ":" && time.length === 7){
        hour = Number(tempTime[0]);
        min = Number(tempTime.substring(2,4));
        sec = Number(tempTime.substring(5,7));
        if (Number.isInteger(min) && Number.isInteger(sec) && Number.isInteger(hour)){
            let timeInSeconds = (hour * 60 * 60) + (min * 60) + sec
            if(min > 60 || hour > 24 || hour < 0){
                return [false, -1];
            }
            return [true, timeInSeconds];
        } else {
            return [false, -1];
        }
    }    

    return [false, -1];
} 

// tests isFormatTime
// console.log("Should Return True to 10:30 and 630s: " + isFormatTime("10:30"));
// console.log("Should Return False to 00,00: " + isFormatTime("00,00"));
// console.log("Should Return True to 01:00:00 and 3600s: " + isFormatTime("01:00:00"));
// console.log("Should Return False to aa:bb:cc: " + isFormatTime("aa:bb:cc"));
// console.log("Should Return False to aa:bb " + isFormatTime("aa:bb"));
// console.log("Should Return True to 03:30 and 210s: " + isFormatTime("03:30"));
// console.log("Sholud Return True to 01:00 and 60s: " + isFormatTime("01:00"))