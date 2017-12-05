import React, { Component } from 'react';
import './index.css'

class Landing extends Component {
  render() {
    return (
      <div className="landingVideo p-16">
        <div className="overflow-hidden w-full h-full">
          <video 
            autoPlay 
            loop 
            playsInline 
            muted 
            preload="metadata"
            className="object-fit-cover w-full h-full"
            >
            <source src="https://content.simplefeast.com/media/Feast_HowTo_Web_1080p.mp4#t=0.1" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }
}

export default Landing;