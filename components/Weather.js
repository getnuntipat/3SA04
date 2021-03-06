import React, { useState, useEffect } from 'react' ;
import { StyleSheet, Text, View, ImageBackground  } from 'react-native' ;
import Forecast from './Forecast';

export default function Weather(props) {
    const [forecastInfo, setForecastInfo] = useState({
        main: "main",
        description: "description",
        feels_like:0,
        temp: 0,
        
    })
    useEffect(() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.zipCode},th&units=metric&APPID=a1e33c56217fe047828ab5be26041f58`)
        .then((response) => response.json())
        .then((json) => {
            setForecastInfo({
                main: json.weather[0].main,
                description: json.weather[0].description,
                temp: json.main.temp,
                feels_like: json.main.feels_like,
                name: json.name
              });
            })
            .catch((error) => {
              console.warn(error);
            });
        }
      }, [props.zipCode]);
    return (        
        <View>
            <ImageBackground source={require('../bg.jpg')} style={styles.backdrop}>
                <View style={styles.background}></View>
                <Text style = {styles.Text}>Zip Code : {props.zipCode}</Text>
                <Forecast {...forecastInfo} />
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    backdrop: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    mainText: {
        fontSize: 30,
        color: "black",
        paddingTop: 25,
        textAlign: "center",
        opacity: 0.75,
    },
    Text: {
      paddingTop: 50,
      fontSize: 30,
      color: "blue",
      textAlign: "center"
    },
    background: {
      top:40,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "white",
      position: "absolute",
      opacity: 0.35,
      width: "90%",
      height: "90%",
      
    },
  });