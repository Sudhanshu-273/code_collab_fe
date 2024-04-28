const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
  year:  'numeric',
  month: 'short',
  day:   'numeric',
  hour : 'numeric',
  minutes : 'numeric',
  
});


export default function useTimeString (time) {
  try{
    const start = time;
    const startTime = new Date(start);
    
    // Extracting hours and minutes
    let hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    
    // Convert hours to 12-hour format
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Handle midnight (0) as 12 AM
    
    // Formatting minutes to have leading zero if needed
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    
    // Constructing the 12-hour time string
    const twelveHourTime = `${hours}:${formattedMinutes} ${meridiem}`;
      // return longEnUSFormatter.format(new Date(time));
      return twelveHourTime;
  }
  catch(error){
      return time;
  }
  
}
