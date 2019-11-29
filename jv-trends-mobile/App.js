  import React, { Component } from 'react';
  import { StyleSheet, Text, View, ScrollView } from 'react-native';

  import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

  class App extends Component {

    constructor(props){
      super(props);

      this.state = {
        topics: [],
        tableHead: ['Title', 'Old value', 'New value', 'Delta'],
        widthArr: [210, 50, 50, 50]
      };
    }

    componentDidMount(){
      this.timer = setInterval(() => this.fetchTrends(), 5000)
    }

    fetchTrends() {
      data = fetch('http://192.168.0.13:5000/trends?top=30&interval=120')
      .then((response) => response.json())
      .then((data) => this.setState({ topics: data.topics }))
      .catch((error) => {
        console.error(error);
      });

      return data
    }

    render() {
      const state = this.state

      array_topics = []
      for (let i = 0; i < state.topics.length; i += 1) {
        cur = state.topics[i]
        array_topics.push([cur.title, cur.oldval, cur.newval, "+ " + cur.delta])
      }

      return (
        <View style={styles.container}>
        <ScrollView horizontal={true}>
        <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
        </Table>
        <ScrollView style={styles.dataWrapper}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
        {
          array_topics.map((rowData, index) => (
          <Row
          key={index}
          data={rowData}
          widthArr={state.widthArr}
          style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
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
    row: {  height: 60  },
    text: { textAlign: 'center' }
  });

  export default App;
