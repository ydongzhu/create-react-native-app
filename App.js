/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList, 
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  Button
} from 'react-native';

const styles = StyleSheet.create({
    backgroundView: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#D3D3D3'
    },
    flatlist: {
      marginTop: 60,
      flex: 1
    },
    itemcontainer: {
      paddingRight: 20
    },
    itemImage: {
      width: 100,
      height: 150,
      backgroundColor: 'blue'
    },
    itemText: {
      padding: 10,
      justifyContent: 'center',
      fontSize:16
    },
    buttonContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    homeButton: {
      width: 200,
      height: 60,
      backgroundColor: '#ADD8E6',
      fontSize: 18
    }
  });
const REMOVE_INDEX = 3;
const DELETE_ANIMATION_DURATION = 15 * 1000;
const UPDATE_ANIMATION_DURATION = 600;

class App extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  state = {
    items: [
        {
            "name": "a"
        },
        {
            "name": "b"
        },
        {
            "name": "c"
        },
        {
            "name": "d"
        },
        {
            "name": "e"
        },
        {
            "name": "f"
        },
        {
            "name": "g"
        },
        {
            "name": "h"
        },
        {
            "name": "i"
        },
        {
            "name": "j"
        },
        {
            "name": "k"
        },
        {
            "name": "l"
        }
    ]
  }

  componentDidUpdate() {
    this.flatList.scrollToIndex({animated: true, index: 0});
  }

  render() {
      return (
        <View style={styles.backgroundView}>
          <FlatList
            style={styles.flatlist}
            horizontal={true}
            ref={(ref) => {
              this.flatList = ref;
            }}
            data={this.state.items}
            renderItem={({item, index}) =>
              <TouchableOpacity onPress={() => this.moveToStart(index)}>
                <View style={styles.itemcontainer}>
                  <Image style={styles.itemImage}></Image>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => item.name}
          />
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.homeButton}
              title="Hack"
              onPress={() => this.hack()} />
          </View>
        
      </View>
      );
  }

  moveToStart(index) {
      this.configLayoutAnimation();
      const start = this.state.items.slice(0, index);
      const end = this.state.items.slice(index + 1);
      const first = [this.state.items[index]];
      this.setState({
          items: first.concat(start).concat(end),
      }); 
  }

  configLayoutAnimation() {
    LayoutAnimation.configureNext({
      duration: 0,
      update: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.scaleXY,
          duration: UPDATE_ANIMATION_DURATION,
      },
      delete: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
          duration: DELETE_ANIMATION_DURATION,
      },
    });
  }

  hack() {
    this.removeIndex();
    setTimeout(() => {
        this.addNewItem();
        setTimeout(() => {
          this.moveToStart(5);
        }, 1000);
    }, 200);
  }

  removeIndex() {
    this.configLayoutAnimation();
    const index = REMOVE_INDEX;
    const start = this.state.items.slice(0, index);
    const end = this.state.items.slice(index + 1);
    this.setState({
        items: start.concat(end),
    }); 
  }

  addNewItem() {
      var item = [{"name": "a" + Math.round(Math.random() * 10)}];
      const index = REMOVE_INDEX;
      const start = this.state.items.slice(0, index);
      const end = this.state.items.slice(index);
      this.setState({
          items: start.concat(item).concat(end),
      }); 
  }
}

export default App;