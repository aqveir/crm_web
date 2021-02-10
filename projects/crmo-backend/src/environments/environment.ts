// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v712demo1',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  logs:true,

  //Customer Key
  organization_key: 'o202102b1ece4b3799cee762add9f2bf9891a19', //This key and the http_config > api_server > request > params > key['key'] is same

  //Http Settings
  http_config: {

    //API Configuration
    api_server: {
      server: 'http://ellaisys.crmomni.com/',
      apiUrl: 'api/',
      title: '',
      headers: {
        token: { 
          key: 'Authorization',
          value: 'bearer {token}'
        }
      },

      request: {
        time_out: 2*60*1000, // 2 minutes

        params: [
          { key:'key', value:'o202102b1ece4b3799cee762add9f2bf9891a19' },
          { key:'lang', value:'en_US' },
          { key:'source', value:'website' },
        ],
        
        headers: [
          { type: 'token', key: 'Authorization', value: 'bearer {token}' }
        ], //Array value
      },

      response: {
        content_type: 'application/json'
      },
    },
  },

  //Storage Settings
  storage_config: {
    storage_keys: {
      app_key: 'CRM_OMNI_WIDGET',
      auth_claim_key: '_SESSION_USER_AUTH_CLAIM_KEY', //Key to store the authenticated claim
      auth_credentials_key: '_LOCAL_STORAGE_USER_AUTH_CREDENTIALS', //Key to store the auth credentials to remember the successful login.      
    },

  },

  //CDN-Media Path
  media_path: 'http://console.tatobite.ellaisys.com',  

  //Google Settings
  google: {
    maps: {
      key:'AIzaSyBDE8GvKfPb7MVyrM1FQpv2iDiT9Mlbo5E',
      embed_api_key:'AIzaSyD1igHv7SzD_l4KVW_0LKF77t7dC49Bf0U'
    }
  },

  //Application Default Values
  application: {
    language: {
      allow_selection: true,

      //Default selection
      default_selection:'en',
      
      //Language options
      options: [
        {name:"English", code:"en", flag: './assets/media/svg/flags/226-united-states.svg', is_active:true},
        {name:"Spanish", code:"es", flag: './assets/media/svg/flags/128-spain.svg', is_active:true},
        {name:"German", code:"de", flag: './assets/media/svg/flags/162-germany.svg', is_active:true},
        {name:"French", code:"fr", flag: './assets/media/svg/flags/195-france.svg', is_active:true},
        {name:"Hindi (हिन्दी)", code:"hi", flag: './assets/media/svg/flags/246-india.svg', is_active:true},
        {name:"Kannada (ಕನ್ನಡ)", code:"kn", flag: './assets/media/svg/flags/246-india.svg', is_active:false},
        {name:"Marathi (मराठी)", code:"mr", flag: './assets/media/svg/flags/246-india.svg', is_active:false},
        {name:"Romanian", code:"ro", flag: './assets/media/svg/flags/109-romania.svg', is_active:false}
      ],
    },

    timer: {
      application_interval: 5000, //In Milli-seconds
    },

    default: {
      start_page: '/queue',
      auto_page_refersh_time_in_sec: 15
    },

    wallet: {
      minimum_wallet_reload_amount: 500,
      maximum_wallet_balance_amount: 5000,
    }
  },

  // Facebook share
  facebook:{
    fb_appId:'1658574024410741' //Beta
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
