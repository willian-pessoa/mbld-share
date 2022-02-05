const path = require("path");

module.exports = {
  reactStrictMode: true,
  env:{
    REACT_APP_GOOGLE_ID: "787223102223-9bvt52cofrr80u9s3a5cf7sqdbkotm7r.apps.googleusercontent.com",
    REACT_APP_SANITY_PROJECT_ID: "krv761xo",
    REACT_APP_SANITY_TOKEN: "skw4jA5nmyFTR66pIJL2Wg9dgiQqe9JEhZuBv4ylVfkYW6u34bF0PptnH38VUOx5Iv1GwWsC1c1fWPvzZR1b6leEu3rqR8UBrwfcJS8qSXrHV1MEe4JPvxYf7mv1KY3W39mg6O1G0KG9H3Nyggn6BePQAmfh33Wyt5SgrzCffyP05xZBJa6d",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`
  }
}
