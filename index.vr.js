// 'use strict'

import React from 'react'
import { Animated, AppRegistry, asset, Model, Pano, AmbientLight, PointLight, VrButton, Text, View, StyleSheet } from 'react-vr'
import Button from './button.js'

class ModelSample extends React.Component {
  constructor () {
    super()
    this.state = {
      rotation: 0,
      bounceValue: 0.1
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
      rotation: this.state.rotation + delta / 20,
      bounceValue: this.state.bounceValue + delta / 2000
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
        <Pano source={{ uri: [ '../static_assets/space_right1.png', '../static_assets/space_left2.png', '../static_assets/space_top3.png', '../static_assets/space_bottom4.png', '../static_assets/space_front5.png', '../static_assets/space_back6.png' ] }} />
        <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />
        <AmbientLight intensity={0.6} />
        <Model style={{ transform: [ {translate: [ -25, 0, -70]}, {scale: 0.05}, {rotateY: this.state.rotation}, {rotateX: 20}, {rotateZ: -10} ] }} source={{ obj: asset('earth/earth.obj'), mtl: asset('earth/earth.mtl') }} lit={true} />
        <Model style={{ transform: [ {translate: [ 10, 10, -100]}, {scale: 0.05}, {rotateY: this.state.rotation / 5} ] }} source={{ obj: asset('moon/moon.obj'), mtl: asset('moon/moon.mtl') }} lit={true} />
        <View style={this.styles.menu}>
          <Button text='+' />
          <Button text='-' />
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('ModelSample', () => ModelSample)
