import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MainScreen extends Component {


 

  constructor(props) {
    super(props);
   
    this.state = {
      topics: [],
    };
  }

	componentDidMount() {
	       this.timer = setInterval(() => this.fetchTrends(), 5000)

	  }



	fetchTrends() {
		console.log("oe")
		return fetch('http://192.168.0.13:5000/trends?top=5&interval=60')
		.then((response) => response.json())
		.then((data) => this.setState({ topics: data.topics }))
		.catch((error) => {
		console.error(error);
		});
		console.log("la")
	}
	// async function getTrends() {
	//   try {
	//     let response = await fetch(
	//       'http://192.168.0.13:5000/trends?top=5&interval=60',
	//     );
	//     let responseJson = await response.json();
	//     return responseJson.movies;
	//   } catch (error) {
	//     console.error(error);
	//   }
	// }

	render(){
		return (
      		<Text> niangele </Text>
		);
   	}
    
  
}

export let mainScreen = new MainScreen();