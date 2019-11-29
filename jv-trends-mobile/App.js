  import React, { Component } from 'react';
  import { StyleSheet, Text, View, ScrollView } from 'react-native';

  import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

  class App extends Component {

    constructor(props){
      super(props);

      this.state = {
        topics: [],
        tableHead: ['Title', 'Old value', 'New value', 'Delta'],
        widthArr: [209, 50, 50, 50]
      };
    }

    componentDidMount(){
      this.timer = setInterval(() => this.fetchTrends(), 5000)
    }

    fetchTrends() {
      data = fetch('http://192.168.0.13:5000/trends?top=30&interval=240')
      .then((response) => response.json())
      .then((data) => this.setState({ topics: data.topics }))
      .catch((error) => {
        console.error(error);
      });

      return data
    }

    rowStyle(delta, sum_delta) {
      color = 255 - ((delta / sum_delta) * 255)

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
        array_topics.push([cur.title, cur.oldval, cur.newval, cur.delta])
        sum_delta += cur.delta
      }

      return (
        <View style={styles.container}>
        <ScrollView horizontal={true}>
        <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
        </Table>
        <ScrollView style={styles.dataWrapper}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#000000'}}>
        {
          array_topics.map((rowData, index) => (
          <Row
          key={index}
          data={rowData}
          widthArr={state.widthArr}
          style={ this.rowStyle(rowData[3], sum_delta)}
          textStyle={styles.text}
          />
          ))
        }
        </Table>
        </ScrollView>
        </View>
        </ScrollView>
        </View>
        )
    }
  }

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 24, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    text: { textAlign: 'center' }
  });

  export default App;
