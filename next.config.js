module.exports = {
  
  serverRuntimeConfig: {
      secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
      apiUrl:process.env.API_URL,
      apitoken:process.env.API_TOKEN,
      wIPGlobal:process.env.wIPGlobal,
    
  }
}