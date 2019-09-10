export const styleSet = [
  // ===> 0
  {
    pathVisibility: 'hidden',
    worldMapStyle: {
      width: '100%',
      transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out'
    },
    lineMarker: {},
    barStep: '0',
  },

  // ===> 1
  {
    pathVisibility: 'hidden',
    worldMapStyle: {
      width: '100%',
      transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out'
    },
    barStep: '0',
  },

  // ===> 2
  {
    pathVisibility: 'visible',
    worldMapStyle: {
      width: '100%',
      transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out',
      transform: 'perspective(600px) rotateX(45deg)'
    },
    barStep: '0',
  },

  // ===> 3
  {
    pathVisibility: 'visible',
    worldMapStyle: {
      width: '100%',
      transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out',
      transform: 'perspective(600px) rotateX(45deg)'
    },
    barStep: '1'
  },

  // ===> 4
  {
    pathVisibility: 'hidden',
    worldMapStyle: {
      width: '100%',
      transition: 'transform 1s ease-in-out, box-shadow 1s ease-in-out',
      transform: 'perspective(600px) rotateX(45deg) translateY(230px)'
    },
    barStep: '1'
  }
];
