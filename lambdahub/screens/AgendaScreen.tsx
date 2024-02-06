import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda, DateData} from 'react-native-calendars';
import jsonData from '../data/CALENDAR_DATA.json'

interface State {
  items?: AgendaSchedule;
}

export type AgendaEntry = {
  name: string;
  height: number;
  description: string;
  starttime: string;
  endtime: string;
  day: string;
}

export type AgendaSchedule = {
[date: string]: AgendaEntry[];
}


export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined
  };

   //reservationsKeyExtractor = (item, index) => {
   //  return `${item?.reservation?.day}${index}`;
   //};

  componentDidMount() {
    // Load items from the dummy JSON file
    this.loadItemsFromJson();
  }

  loadItemsFromJson = () => {
    // Process the imported JSON data and populate the items state
    const items: AgendaSchedule = {};
    
    jsonData.forEach((event) => {
      const time = new Date(event.date).getTime();
      const strTime = this.timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];
      }

      items[strTime].push({
        name: event.title,
        starttime: event.starttime,
        endtime: event.endtime,
        description: event.description,
        height: 100,
        day: strTime
      });
    });

    this.setState({ items });
  };

  date = new Date().toJSON();

  render() {
    return (
      <Agenda
        
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={this.date.split('T')[0]}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={this.renderDay}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
    );
  }

  loadItems = (day: DateData) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 200; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
        }
      }
      
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  };

  renderDay = (day) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem}/>;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
      style={[styles.item, {height: reservation.height}]}
      onPress={() => this.showAgendaItemDetails(reservation)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.title}>{reservation.name}</Text>
        <Text style={styles.time}>{reservation.starttime} - {reservation.endtime}</Text>
        <Text style={styles.description}>{reservation.description}</Text>
      </View>
    </TouchableOpacity>
    );
  };

  showAgendaItemDetails = (reservation: AgendaEntry) => {
    Alert.alert(
      reservation.name,
      `Start Time: ${reservation.starttime}\nEnd Time: ${reservation.endtime}\nDescription: ${reservation.description}`
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateItem}>
        <Text style={styles.emptyDateText}>No Events Scheduled Today</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    marginLeft: 0,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  emptyDateItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    
  },
  emptyDateText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  }
});
