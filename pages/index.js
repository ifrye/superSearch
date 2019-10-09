import React from "react";
import Header from '../components/Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     
      <div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "2px solid green" }}>
         <body>
            
            <Header />
            
            <h1>Campgrounds</h1>
           
            <img src="/static/westlake-campground.png" style={{height:400,width:500}} />
        
            <p>Sometimes spending a day in the wilderness isn't quite enough to truly capture the feeling of a special place. 
            Sure you see some amazing views or go on an unforgettable hike.  But to get the full experience, you yearn to see 
            the dark, starry skies.  To listen to the Yips of coyotes. To watch the sun rise on a silent, dewy morning.  
            Camping in the great outdoors transforms a regular old road trip into an epic experience. So pack up your tent or 
            hitch up the fifth wheel -- adventure awaits!</p>
        
          </body>

        <style jsx>{`
          h1,
          h2,
          a,
          p {
            font-family: "Arial";
            textAlign: center;
            color: green;
          }

          .description {
            font-family: "Arial";
            font-size: "10px";
          }
          
          a {
            text-decoration: underline;
            color: green;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
