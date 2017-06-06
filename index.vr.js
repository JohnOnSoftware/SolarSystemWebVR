/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict'

import React from 'react'
import { Animated, AppRegistry, asset, Model, Pano, PointLight, Text, View } from 'react-vr'


class ModelSample extends React.Component {
  constructor () {
    super()
    this.state = {
      rotation: 0,
      bounceValue: 0.1
    }
    this.lastUpdate = Date.now()
    this.rotate = this.rotate.bind(this)
  }

  /**
   * After kickoff in componentDidMount(), rotate is called every frame through
   * requestAnimationFrame. It updates the state.rotation variable used to rotate
   * the model based om on time measurement; this is important to account for
   * different VR headset framerates.
   */
  rotate () {
    const now = Date.now()
    const delta = now - this.lastUpdate
    this.lastUpdate = now

    this.setState({
      rotation: this.state.rotation + delta / 20,
      bounceValue : this.state.bounceValue + delta/2000
    })

    this.frameHandle = requestAnimationFrame(this.rotate)
  }

  componentDidMount () {
    this.rotate()
    // this.setState( {bounceValue: 0.1});
    // Animated.spring(
    //   this.state.bounceValue, // Animate `bounceValue`
    //   {
    //     toValue: 0.5, // Animate to smaller size
    //     friction: 1, // Bouncier spring
    //   }
    // ).start();
  }

  

  componentWillUnmount () {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle)
      this.frameHandle = null
    }
  }

  render () {
    // We build the scene out of three elements:
    //   - A model that displays a rotating object
    //   - A point light, useful for adding color to the model material which would otherwise be dark.
    //   - Text message positioned above the creature
    // A chain of transformations is applied to the model, which are executed from right to left.
    // In out case, the model was too large for the scene and oriented sideways, so we scaled it and
    // rotated it into place. This would not be necessary if your object had correct size ot begin with.
    // We are also applying a new rotation around the Y axis every frame to produce the desired animation.
    return (
      <View>
        <Pano source={
          {
            uri:[
              '../static_assets/space_right1.png',
              '../static_assets/space_left2.png',
              '../static_assets/space_top3.png',
              '../static_assets/space_bottom4.png',
              '../static_assets/space_front5.png',
              '../static_assets/space_back6.png'
            ]
          }
        
        }
        />

        <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />


      <Model 
        style={{
          transform:[
            {translate: [ -25, 0, -70]},
            {scale: 0.05},
            {rotateY: this.state.rotation},
            {rotateX: 20},
            {rotateZ: -10},
          ],
        }}
      
      source={{
        obj:asset('earth/earth.obj'), 
        mtl:asset('earth/earth.mtl'),
      }} 
      lit={true} 
    />

      <Model 
        style={{
          transform:[
            {translate: [ 10, 10, -100]},
            {scale: 0.05},
            {rotateY: this.state.rotation},
          ],
        }}
      
      source={{
        obj:asset('moon/moon.obj'), 
        mtl:asset('moon/moon.mtl'),
      }} 
      lit={true} 
    />
        
        
    </View>
    )
  }
}

AppRegistry.registerComponent('ModelSample', () => ModelSample)
