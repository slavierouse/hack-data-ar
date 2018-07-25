import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Camera, Permissions, Location, Gyroscope } from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import { ballpark_driver_locations } from './ballpark_driver_locations';
import { valencia_driver_locations } from './valencia_driver_locations';
import { valencia_pudo_locations } from './valencia_pudo_locations';
import { office_driver_locations } from './office_driver_locations';
import { office_rides_start } from './office_rides_start';
import { office_rides_pin } from './office_rides_pin';
dataPoints = office_rides_pin;

//console.disableYellowBox = true;

const globalMyLatOverride = null//37.777103//37.777102//37.777111//37.776947//37.777279;
const globalMyLngOverride = null//-122.390825//-122.390853//-122.390842//-122.390626//-122.391091;
const globalMyAltOverride = 4;
const alignment = ExpoTHREE.WorldAlignment.GravityAndHeading;
const boxSizeMeters = 2;

// const dataPoints = [{
//   lat: 37.775510,
//   lng: -122.393436
// }]

//set up math
const m1 = 111132.92;     // latitude calculation term 1
const m2 = -559.82;       // latitude calculation term 2
const m3 = 1.175;         // latitude calculation term 3
const m4 = -0.0023;       // latitude calculation term 4
const p1 = 111412.84;     // longitude calculation term 1
const p2 = -93.5;         // longitude calculation term 2
const p3 = 0.118;         // longitude calculation term 3

const cosDeg = (deg) => Math.cos(deg * (Math.PI / 180));

const latlen = (lat) => m1 + (m2 * cosDeg(2 * lat)) + (m3 * cosDeg(4 * lat)) + (m4 * cosDeg(6 * lat));
const longlen = (lat) => (p1 * cosDeg(lat)) + (p2 * cosDeg(3 * lat)) + (p3 * cosDeg(5 * lat));

const calcNorthSouth = (lat_point, lat_us) => (lat_point - lat_us)*latlen((lat_point + lat_us)/2);
const calcEastWest = (lat_point, lng_point, lat_us,lng_us) => (lng_point - lng_us) * longlen((lat_point + lat_us)/2);


// const lat1 = 38.898556;
// const lng1 = -77.037852;
// const lat2 = 38.897147;
// const lng2 = -77.043934;

// console.log('DISTANCE NORTH ', calcNorthSouth(lat1, lat2));
// console.log('DISTANCE EAST ', calcEastWest(lat1, lng1, lat1, lng2));
// console.log('OVERALL ', Math.sqrt(Math.pow(calcNorthSouth(lat1, lat2),2) + Math.pow(calcEastWest(lat1, lng1, lat1, lng2),2))) 
// console.log('done')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      gyroscopeData: {}
    }
  }

  _subscribe = () => {
    console.log('subscribing to Gyroscope')
    this._subscription = Gyroscope.addListener((result) => {
      this.setState({gyroscopeData: result});
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  componentWillMount() {

    ExpoTHREE.THREE.suppressExpoWarnings(true);
    //this._subscribe();
    Permissions.askAsync(Permissions.LOCATION);

    Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    }).then(location => {
      this.setState({location})
    })

  }

  componentWillUnmount() {
    //this._unsubscribe;
  }


  _onGLContextCreate = async (gl) => {
    const arSession = await this._glView.startARSessionAsync();
    ExpoTHREE.setWorldAlignment(arSession, alignment);

    const scene = new THREE.Scene();
    
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    );

    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    
    const genCube = (color, pos) => {
      //console.log(pos);
      const geometry = new THREE.BoxGeometry(boxSizeMeters, boxSizeMeters, boxSizeMeters);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.7
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = pos.x || 0.01;
      cube.position.y = pos.y || 0.01;
      cube.position.z = pos.z || 0.01;
      return cube;
    }

    // scene.add(
    //   genCube(`rgb(255,0,0)`,
    //   {
    //     x:5
    //   })
    // )

    // scene.add(
    //   genCube(`rgb(0,255,0)`,
    //   {
    //     y:5
    //   })
    // )

    // scene.add(
    //   genCube(`rgb(0,0,255)`,
    //   {
    //     z:5
    //   })
    // )


    for(let i = 0; i < dataPoints.length; i++) {
      //console.log(`CALC DISTANCE FROM ${this.state.location.coords.latitude}, ${dataPoints[i].lat} to ${this.state.location.coords.longitude}, ${dataPoints[i].lng}`);
      scene.add(
        genCube(dataPoints[i].color || `rgb(255,0,0)`, {
          z: calcNorthSouth(globalMyLatOverride || this.state.location.coords.latitude,dataPoints[i].lat),
          x: calcEastWest(dataPoints[i].lat,dataPoints[i].lng,globalMyLatOverride || this.state.location.coords.latitude,globalMyLngOverride || this.state.location.coords.longitude),
          y: -(globalMyAltOverride || this.state.location.coords.altitude)
        })
      );
    }


    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }

  render() {
    if (this.state.location == undefined) {
      return (<Text>Finding your location...</Text>)
    }
    return (
      <View style = {{
          height: '100%',
          width: '100%',
          flex: 1
        }}>
        <View style = {{
          height: '100%',
          width: '100%',
          flex: 1
        }}>
          { 
            false && !this.state.hasCameraPermission && (<Text>Camera comes here</Text>)
          }

          {
            true && (
              //<Camera style={{ flex: 1, height: '100%', width: '100%' }} type={this.state.type} />
              <Expo.GLView
                style={{ flex: 1 }}
                ref={(ref) => this._glView = ref}
                onContextCreate={this._onGLContextCreate}
              />
            )
          }
          
        </View>
        {/*<View style = {{
          height: '40%',
          width: '100%'
        }}>
          <MapView
            style={{
              flex: 1
            }}

            initialRegion={{
              latitude: globalMyLatOverride || this.state.location.coords.latitude,
              longitude: globalMyLngOverride || this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          {
            dataPoints.map((point, i) => {
              //console.log(point)
              return (<MapView.Marker
                key = {i}
                coordinate = {{
                  latitude: point.lat,
                  longitude: point.lng
                }}
                pinColor={point.color || rgb(255,0,0)}
              />)
            })
          }
            <MapView.Marker
              coordinate = {{
                latitude: globalMyLatOverride || this.state.location.coords.latitude,
                longitude: globalMyLngOverride || this.state.location.coords.longitude
              }}
            />
          </MapView>
        </View>
        <View style = {{
          height: '0%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>{JSON.stringify(this.state.location.coords)}</Text>
        </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    color: 'white',
    backgroundColor: 'green'
  },
});
