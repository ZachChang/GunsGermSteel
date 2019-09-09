import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

class Description extends Component {
  render() {
    const { step } = this.props;
    return (
      <div className='description'>
      <Fade bottom collapse when={step===0} duration={500}>
        <div className='description-title'>Why did human development proceed at such different rates on various continents?</div>
        <div className='description-content'>
          Jared Diamond's celebrated thesis in <span className='font-italic'>Guns, Germs, and Steel: The Fates of Human Societies</span> explains that societies in Eurasia are more materially successful than others because of geographical luck.
        </div>
        <div className='description-footer'>
          Click to start
          <i className='icon icon-right icon-arrow-right-circle'></i>
        </div>
      </Fade>
      <Fade bottom collapse when={step===1} duration={1500}>
        <div className='description-title'>Eurasia is longest from east to west</div>
        <div className='description-content font-italic'>
          'Axis orientations affected the rate of spread of crops and livestock, and possibly also of writing, wheels, and other inventions. That basic feature of geography thereby contributed heavily to the very different experiences of Native Americans, Africans, and Eurasians in the last 500 years.'
        </div>
        <div className='description-footer'>
          (Scroll Down to Continue)
        </div>
      </Fade>
      <Fade bottom collapse when={step===2} duration={1500}>
        <div className='description-title'>Eurasian peoples happened to inherit many more species of domesticable large wild mammalian herbivores than did peoples of the other
continents.</div>
      </Fade>
      <Fade bottom collapse when={step===3} duration={1500}>
        <div className='description-content'>There are only 14 such species were domesticated before the twentieth century.</div>
        <div className='description-content'>
          The wild ancestors of the Ancient Fourteen were spread unevenly over the globe. South America had only one such ancestor. North America, Australia, and sub-Saharan Africa had none at all.
        </div>
        <div className='description-content'>
          In contrast, the wild ancestors of 13 of the Ancient Fourteen were confined to Eurasia.
        </div>
      </Fade>
      </div>
    );
  }
}
export default Description
