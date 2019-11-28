import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends Component {

  constructor(props){
      super(props);
   
      this.state = {
        topics: [],
      };
  }

  componentDidMount(){
    this.timer = setInterval(() => this.fetchTrends(), 5000)
  }

  fetchTrends() {
    return fetch('http://192.168.0.13:5000/trends?top=5&interval=60')
    .then((response) => response.json())
    .then((data) => this.setState({ topics: data.topics }))
    .catch((error) => {
    console.error(error);
    });
  }

  render() {
    console.log(this.state.topics)
    const items = this.state.topics.map((item, key) =>
       <Text>{item.title}</Text>
       <Text>{item.oldval}</Text>
       <Text>{item.newval}</Text>

    );
    return items;

  }
}

export default App;
