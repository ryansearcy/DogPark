/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import * as firebase from "firebase";
 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator
 } from 'react-native';
 import Login from "./includes/views/login";
 import Home from "./includes/views/home";

 firebase.initializeApp({
  apiKey: "AIzaSyAsFIs0QQszg5a_H-WvbEh8Fa-IzycIeNY",
  authDomain: "dogpark-474ff.firebaseapp.com",
  databaseURL: "https://dogpark-474ff.firebaseio.com",
  projectId: "dogpark-474ff",
  storageBucket: "dogpark-474ff.appspot.com",
  messagingSenderId: "147904946050"
 });

 export default class DogPark extends Component {
   constructor(props) {
     super(props);

     this.getInitialView();

     this.state = {
       userLoaded: false,
       initialView: null
     };

     this.getInitialView = this.getInitialView.bind(this);

   }

   getInitialView() {

     firebase.auth().onAuthStateChanged((user) => {

       let initialView = user ? "Home" : "Login";

       this.setState({
         userLoaded: true,
         initialView: initialView
       })
     });

   }
   static renderScene(route, navigator) {

      switch (route.name) {

        case "Home":
          return (<Home navigator={navigator} />);
          break;

        case "Login":
          return (<Login navigator={navigator} />);
          break;

      }

    }

    static configureScene(route) {

      if (route.sceneConfig) {
        return (route.sceneConfig);
      } else {
        return ({
          ...Navigator.SceneConfigs.HorizontalSwipeJump,
          gestures: {}
        });
      }

    }

    render() {

      if (this.state.userLoaded) {

        return (
            <Navigator
                initialRoute={{name: this.state.initialView}}
                renderScene={DogPark.renderScene}
                configureScene={DogPark.configureScene}
            />);
      } else {
        return null;
      }

    }

  }

AppRegistry.registerComponent('DogPark', () => DogPark);