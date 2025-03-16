export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
  
    // Format date: dd/mm/yyyy
    const formattedDate = date.toLocaleDateString("en-GB");
  
    // Format time: hh:mm:ss
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    });
  
    return { formattedDate, formattedTime };
  };