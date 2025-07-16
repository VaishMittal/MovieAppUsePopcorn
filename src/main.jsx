import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import StarRating from "./components/StarRating";
import React from "react";

import App from './App.jsx'
// function Test(){
//   const [movieRating,setMovieRating] = useState(0);
//   return (
//     <div>
//        <StarRating
//             maxRating={15}
//             color="pink"
//             onSetRating={setMovieRating}
//           />
//          <p style={{fontSize:"20px"}}> this movies was rated {movieRating} stars...</p> 
//     </div>
//  )
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
    {/* <StarRating maxRating={6} />
    <StarRating maxRating={10} />
    <StarRating 
      maxRating={5}
      size={30} 
      color="red"
      className="test"
      messages={["Terrible" , "Bad","Okay","Good","Amazing"]}
      defaultRating={3}
      />
      <Test/> */}

    <App />
  </StrictMode>
);
