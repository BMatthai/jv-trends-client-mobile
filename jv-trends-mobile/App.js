  import React, { Component } from 'react';
  import { StyleSheet, Text, View, ScrollView, Linking, Dimensions, StatusBar } from 'react-native';
  import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

  class App extends Component {

    constructor(props){
      super(props);

      const screenWidth = Math.round(Dimensions.get('window').width);

      this.state = {
        topics: [],
        tableHead: ['Topic title', 'Posts\nH - 2', 'Posts\nH', 'Delta'],
        statusBarHeight: StatusBar.currentHeight,
        widthArr: [screenWidth * 0.58, screenWidth * 0.14, screenWidth * 0.14, screenWidth * 0.14]
      };
    }

    componentDidMount(){
      this.fetchTrends()
      this.timer = setInterval(() => this.fetchTrends(), 5000)
    }

    fetchTrends() {
      data = fetch('http://192.168.0.13:5000/trends?top=20&interval=120')
      .then((response) => response.json())
      .then((data) => this.setState({ topics: data.topics }))
      .catch((error) => {
        console.error(error);
      });

      return data
    }

    containerStyle() {
          return {
            flex: 1, 
            padding: 0, 
            paddingTop: this.state.statusBarHeight, 
            backgroundColor: '#fff' }
    }
    rowStyle(delta, sum_delta) {
      if (sum_delta == 0) {
        return {
          height: 60,
          backgroundColor: "rgb(255, 255, 128)"
        } 
      }

      color = 255 - ((delta / (sum_delta / 3)) * 255)
      color = Math.min(color, 255)


      return {
        height: 60,
        backgroundColor: "rgb(255, " + color + ", 128)"
      }
    }

    render() {
      const state = this.state

      array_topics = []
      sum_delta = 0
      for (let i = 0; i < state.topics.length; i += 1) {
        cur = state.topics[i]

        array_topics.push([cur.title, cur.oldval, cur.newval, cur.delta, cur.link])
        sum_delta += cur.delta
      }

      return (
        <View style={ this.containerStyle() }>
        <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
        </Table>
        <ScrollView style={styles.dataWrapper}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
        {
          array_topics.map((rowData, index) => (
          <Row
          key={index}
          data={[rowData[0], rowData[1], rowData[2], "+" + rowData[3]]}
          widthArr={state.widthArr}
          style={ this.rowStyle(rowData[3], sum_delta)}
          textStyle={styles.text}
          onPress={() => Linking.openURL('http://www.jeuxvideo.com' + rowData[4])}
          />
          ))
        }
        </Table>
        </ScrollView>
        </View>
        )
    }
  }

  const styles = StyleSheet.create({
    header: { height: 60, backgroundColor: 'rgb(192, 192, 192)'},
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    text: { textAlign: 'center' }
  });

  export default App;
