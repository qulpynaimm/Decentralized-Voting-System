import React, {useState, useEffect} from "react"; 
 
const Test = () => { 
  const [data, setData] = useState([]); 
 
  const fetchData = async () => { 
    try { 
      const response = await fetch('https://k4p72wppjc3ujwfpxw7sdf54e40fsrko.lambda-url.us-east-1.on.aws/api/v1/index'); 
      const jsonData = await response.json(); 
      console.log(jsonData); 
      setData(jsonData); 
    } catch (error) { 
      console.error(error); 
    } 
  }; 
   
  useEffect(() => { 
    fetchData(); 
  }, []); 
   
  return ( 
    <div> 
      {Array.isArray(data) && data.map((item) => ( 
        <p key={item.email}>{item.email}</p> 
      ))} 
    </div> 
  ); 
}; 
 
export default Test;