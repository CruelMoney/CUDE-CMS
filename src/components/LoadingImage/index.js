import React from 'react';
import styles from './index.module.css'

class Image extends React.Component {
 
  img = null

  render() {
    return (
        <img 
        {...this.props}
        ref={(i=>{
          if(i && !i.complete){
            this.img = i
            i.style.opacity = 0
          }
        })}
        className={
          styles.reveal + " " +
          (this.props.className ? this.props.className : "")
          }
        onLoad={(()=>{
          if (this.img) this.img.style.opacity = null
          if (this.props.onLoad) this.props.onLoad()
          })}
       />
    );
  }
}

export default Image

