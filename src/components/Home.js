import React, { Component } from "react";
import App from "./App";
import CountryChooserList from "./CountryChooserList";
import NewsFeed from "./NewsFeed";
import NewsHeadline from "./NewsHeadline";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      SelectedCountry: "",
      loaded: true,
      currentTime: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    setInterval(this.geTdate, 1000);
  }
  handleCLick = event => {
    this.setState({ loaded: false });
    let a = event.target.getAttribute("val");
    fetch(
      `https://newsapi.org/v2/top-headlines?source=google-news&country=${a}&apiKey=a9b320f1f47644f99dab6b9407db90b0`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          newsList: json.articles,
          SelectedCountry: "IN",
          loaded: true
        });
      });
  };
  geTdate = () => {
    const a = new Date().toLocaleTimeString();
    this.setState({ currentTime: a });
  };

  render() {
    return (
      <div>
        <p> {this.state.currentTime}</p>
        <CountryChooserList getNews={this.handleCLick} />
        <NewsFeed newsList={this.state.newsList} loaded={this.state.loaded} />
      </div>
    );
  }
}

export default Home;
