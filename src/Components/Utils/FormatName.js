const formatName = (username) => {
//    very important, because the name can be undefined before the component is fully loaded
    if (!username) {
        return ""
    }
  // saad_abbas
return (
  username
    .split("_") // seperating by _
    .filter(Boolean) // filtering for any empty entry ""
        .map((word) => word.replace(/[^a-zA-Z]/g, "") // remove all non-alphabetics
        .toLowerCase())     // converts them to lowercase
    .filter(Boolean)        // fileter again
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + // convert first index to uppercase
        word.slice(1)
    ) // add the rest of the string
    .join(" ")
); // will join them by space
    
};

export default formatName;
