import Header from '../components/Header';

export default function About(){
	return(
		<div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "2px solid green", padding: "50px" }}>
			<div>
				<Header />
				<h1>Featured Video</h1>
				<iframe width="600" height="315"
					src="https://www.youtube.com/embed/LzskqGzoLDA">
				</iframe>
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