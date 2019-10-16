import React from "react";
import Header from '../components/Header';
import {getInfo} from '../lib/utils.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={search: ""};
  }

  handleUpdate(evt){
    this.setState({search: evt.target.value});
  }

  async handleSearch(evt){
    const user = await getInfo(this.state.search);
    this.setState({user});
  }

  render() {
    return (
     
      <div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "2px solid green", padding: "9px" }}>
            
            <Header />
            
            <h1>New Mexico Campground Search</h1>

            <p><input type='text' value={this.state.search} onChange={this.handleUpdate.bind(this)}/></p>
            <div style={{ textAlign:"center", marginBottom: "10px" }} className="button-style" onClick={this.handleSearch.bind(this)}>Submit</div>

            {this.state.user ? <div>
                <br />
                <h3>{this.state.user.name}</h3>

                <img style={{maxWidth: '800px', maxHeight: '800px'}}
                  src= {this.state.user.image_url} /> <br />

                  <h3>{this.state.user.closest_town}</h3>

                  <p>{this.state.user.description}</p>

              </div> : null}

              {"user" in this.state && this.state.user == null ? <div>
                <p>{this.state.search} Not Found</p>
              </div> : null}


        <style jsx>{`
          h1,
          h2,
          a{
            font-family: "Arial";
            textAlign: center;
            color: green;
          }

          .h3{
            font-family: "Arial";
            textAlign: center;
            color: black;
          }

          .p{
            font-family: "Arial";
            textAlign: center;
            color: black;
          }

          .button-style{
            margin: auto auto;
            cursor: pointer;
            background-color: green;
            color: #ffffff;
            width: 100px;
            font-family: "Arial";
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
