module.exports = {
  settings: {
    prefix: '!', // the commands prefix
    developers: ['iHsein'], // commands can be used by developers only
    moderators: ['iHsein'], // commands can be used by moderators only
    action: 'walk', // 3 types "walk", "move", and "sit" 
    coordinates: {
      x: 1,
      y: 0,
      z: 1,
      facing: 'FrontRight'
    },
    object: {
      entity_id: '648f0fe90000000000000c82',
      anchor_ix: 0
    }
  },
  periodic: {
    type: 'multiple', // 2 types "multiple" or "single"
    isEnabled: true, // enable or disable periodic messages
    duration: 3, // in minutes
    messages: ['This is an example message', 'Enjoy using highrise.sdk']
  },
  authentication: {
    token: 'change-me',
    room: 'change-me'
  }
}