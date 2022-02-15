// convert a time in sec to the format 00:00:00
export const timeToString = (time) => {
    let hour =  Math.trunc(time / 3600);
    let min = time < 3600 ? Math.trunc(time / 60) : Math.trunc((time - (hour * 3600)) / 60);
    let sec = time % 60;

    if (hour === 0){
        return(
            (min < 10 ? "0" + min : min) + ":" + 
            (sec < 10 ? "0" + sec : sec)            
        );
    } else if (hour > 0) {
        return(
            hour + ":" +
            (min < 10 ? "0" + min : min) + ":" + 
            (sec < 10 ? "0" + sec : sec)            
        );
    } else {
        return ""
    }
}

// tests
// console.log("Expect 00:35 returned: " + timeToString(35))
// console.log("Expect 2:00 returned: " + timeToString(120))
// console.log("Expect 10:30 returned: " + timeToString(630))
// console.log("Expect 1:00:30 returned: " + timeToString(3630))
// console.log("Expect 2:00:30 returned: " + timeToString(7230))