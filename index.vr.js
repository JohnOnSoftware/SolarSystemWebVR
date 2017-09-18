import React from 'react'
import { Animated, AppRegistry, asset, Model, Pano, AmbientLight, PointLight, VrButton, Text, View, StyleSheet } from 'react-vr'
import Button from './button.js'


class ModelSample extends React.Component {
  constructor () {
    super()
    this.state = {
      rotation: 0,
      scale: 0.1
    }

    this.styles = StyleSheet.create({
      menu:{
        flex: 1,
        flexDirection: 'column',
        width:1,
        alignItems: 'stretch',
        transform:[
          {
            translate:[2, 2, -5]
          }
        ]
      }
    })
    this.lastUpdate = Date.now()
    this.rotate = this.rotate.bind(this)
  }

  rotate () {
    const now = Date.now()
    const delta = now - this.lastUpdate
    this.lastUpdate = now

    this.setState({
      rotation: this.state.rotation + delta / 20
    })

    this.frameHandle = requestAnimationFrame(this.rotate)
  }

  componentDidMount () {
    this.rotate()
  }



  componentWillUnmount () {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle)
      this.frameHandle = null
    }
  }

  render () {
    return (
      <View>
        <Pano source={asset('sky.jpg')}/>
        <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />
        <AmbientLight intensity={0.6} />
        <Model style={{ transform: [ {translate: [ 10, -10, -100]}, {scale: this.state.scale}, {rotateY: this.state.rotation / 5} ] }} source={{ obj: asset('IronMan/IronMan.obj'), mtl: asset('IronMan/IronMan.mtl') }} lit={true} />
        <View style={this.styles.menu}>
          <Button text='+' callback={() => this.setState((prevState) => ({ scale: prevState.scale * 2 }) ) } />
          <Button text='-' callback={() => this.setState((prevState) => ({ scale: prevState.scale/2 }) ) } />
        </View>
      </View> 
    )
  }
}

AppRegistry.registerComponent('ModelSample', () => ModelSample)
