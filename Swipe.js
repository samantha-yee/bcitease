// swipe code for react-native

import Profile, { Component } from './comp/Profile';
 
 
const profs = []
 
const Wrapper = () => {
  return (
      <Cards onEnd={action('end')} className='master-root'>
        {data.map(item => 
          <Card 
            onSwipeLeft={action('swipe left')} 
            onSwipeRight={action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
  )
}