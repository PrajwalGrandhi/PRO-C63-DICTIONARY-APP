import React from 'react';
import { render } from 'react-dom';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets, initialWindowMetrics} from "react-native-safe-area-context";
import axios from'axios';

export default class App extends React.Component{

  constructor()
  {
    super();
    this.state={
      textstate:"Enter the word to search",
      Dtextstate:"",
      define:"",
      word:"",
      lexprop:""
    }
  }
  getword=(word)=>{
var searchKeyword=word.toLowerCase();
const url ='https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+'.json';
    axios.get(url).then(response => response.data)
    .then((data) => {
      var responseObject=data;

      if(responseObject)
      {
        var wordData=responseObject.definitions[0];
        var defination=wordData.description;
        var lex=wordData.wordtype;
        
        this.setState({
          'word':this.state.textstate,
          'define':defination,
          'lexprop':lex
        });
      }
      else{
          this.setState({
            'word':this.state.text,
            'lexprop':"NOT FOUND",
            'define':"NOT FOUND"
          });
      }
     })   
  }
    
  render(){
    return (
      <SafeAreaProvider>
        <Header
  centerComponent={{ text: 'Dictionary-Search', style: { color: '#fff' } }}
/>
     <View style={{flex:1,flexDirection: "column",justifyContent:'space-around',alignItems:'center'}}>
     
<TextInput
        style={{ height: 40,width:200,borderColor: 'gray', borderWidth: 1 ,alignItems:'center',justifyContent:'center',textAlign:'justify'}}
        onChangeText={(text) => {this.setState({textstate:text})}}
        value={this.state.textstate}
     />
<TouchableOpacity style={styles.button}onPress={()=>{
  this.getword(this.state.textstate);
}} >
<Text>Search</Text>
</TouchableOpacity>

<View>
  <Text>
  Word : {" "}
  </Text>

  <Text style={ {fontSize: 18 }}>
  {this.state.word}
  </Text>

  <Text>
  Type : {" "}
  </Text>

  <Text style={ {fontSize: 18 }}>
  {this.state.lexprop}
  </Text>

  <Text>
  defination : {" "}
  </Text>

  <Text style={ {fontSize: 18 }}>
  {this.state.define}
  </Text>
</View>

     </View>
     </SafeAreaProvider>
    );

  }
}

  

const styles = StyleSheet.create({
  button: {
    //marginTop: 350,
    //marginLeft: 70,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 200,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 100,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textstyle: {
    fontSize: 14,
    marginTop:20,
    marginLeft:145,
    color:"cyan"
  }
})