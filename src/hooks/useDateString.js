const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
    hour : 'numeric',
    minutes : 'numeric',
    
  });
  
  
   export default function useDataString(dateString) {
    try{
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    return `${day}-${month}-${year}`;
    }catch(error){
        return dateString
    }
  }