import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback,
    Image,
} from "react-native";

import React, {Component} from "react";
import * as firebase from "firebase";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import Button from "apsl-react-native-button";
import Database from "../firebase/database";

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
        email: "",
        password: "",
        response: "",
        ownerName: "",
        dogName: ""
    };
  }

  async signup() {
    try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

        setOwnerName(this.state.ownerName);
        setDogName(this.state.dogName);

        this.setState({
            response: "account created"
        });

        setTimeout(() => {
            this.props.navigator.push({
                name: "Home"
            })
        }, 1500);

    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }
  render() {
    return(
      <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
               <Image
               source={require('./grass.jpg')}
               style={styles.main}>

                   <View style={styles.formGroup}>
                       <Text style={styles.title}>Login</Text>
                       <Sae
                           label={"Email Address"}
                           labelStyle={{color: "#fff"}}
                           iconClass={FontAwesomeIcon}
                           iconName={"pencil"}
                           iconColor={"white"}
                           onChangeText={(email) => this.setState({email})}
                           keyboardType="email-address"
                           autoCapitalize="none"
                       />
                       <Sae
                           label={"Password"}
                           labelStyle={{color: "#fff"}}
                           iconClass={FontAwesomeIcon}
                           iconName={"key"}
                           iconColor={"white"}
                           onChangeText={(password) => this.setState({password})}
                           password={true}
                           autoCapitalize="none"
                       />
                       <Sae
                           label={"Owner's Name"}
                           labelStyle={{color: "#fff"}}
                           iconClass={FontAwesomeIcon}
                           iconName={"key"}
                           iconColor={"white"}
                           onChangeText={(ownerName) => this.setState({ownerName})}
                           autoCapitalize="none"
                       />
                       <Sae
                           label={"Dog's Name"}
                           labelStyle={{color: "#fff"}}
                           iconClass={FontAwesomeIcon}
                           iconName={"key"}
                           iconColor={"white"}
                           onChangeText={(dogName) => this.setState({dogName})}
                           password={true}
                           autoCapitalize="none"
                       />

                       <View style={styles.submit}>
                           <Button onPress={this.signup} style={styles.buttons} textStyle={{fontSize: 18, color: "#000"}}>
                               Sign up
                           </Button>
                       </View>
                   </View>
                   <View>
                       <Text style={styles.response}>{this.state.response}</Text>
                   </View>
                   </Image>
           </TouchableWithoutFeedback>
       );
   }

}

const styles = StyleSheet.create({

   main: {
     flex: 1,
     width: null,
     height: null,
   },

    formGroup: {
        padding: 50,
    },

    buttons: {
      backgroundColor: "#fff",
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
    },

    submit: {
        paddingTop: 30,
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50,
    }
});


module.exports = Signup;