import Header from '../components/Header';

export default function Search(){
	return(
		<div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "2px solid green", padding: "50px" }}>
			<div>
				<Header />
				<h1>Find a Campground</h1>
			</div>
			<style jsx>{`
          		h1,
         		h2,
          		a,
          		p {
            		font-family: "Arial";
            		textAlign: center;
            		color: green;
          		}

          	`}</style>
      </div>
		);
}