//const packageJson = require('../../package.json');
const HOST = 'https://localhost:7256/api/proxy/api';
const enviromentsName = "Ambiente de Pruebas"
export const enviroments = {
  msalConfiguration: {
    auth: {
      clientId: '',
      authority: '',
      redirectUri: 'http://localhost:4200/',
    },
    system: {
      allowNativeBroker: false, // Disables native brokering support
    },
  },
  API_PUBLIC: HOST + '/',
  production: true,
  context: 'develop',
  ENVIRONMENT_NAME : enviromentsName,
  //version: packageJson.version,
  minutesInactive: 30,
  minutesToRefresh: 5,
};
