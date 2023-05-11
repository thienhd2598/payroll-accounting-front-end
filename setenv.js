const env = process.env.NODE_ENV;
if (env === 'production') {
    console.log(`URL_API=https://api.itsafe.vn/v1/graphql`);
    console.log(`URL_WSS=wss://api.itsafe.vn/v1/graphql`);    
    console.log(`URL_UTILS=https://utils.itsafe.vn`);
    console.log(`GOOGLE_API_TOKEN=AIzaSyA05tJMsKW5fC_tTB3aYZme1LQn1mGKFCg`);
} else if (env === 'staging') {
    console.log(`URL_API=https://dev.itsoft.vn/api/v1.0`);
    console.log(`URL_WSS=wss://dev-api.itsafe.vn/v1/graphql`);    
    console.log(`URL_UTILS=https://dev-utils.itsafe.vn`);
    console.log(`GOOGLE_API_TOKEN=AIzaSyA05tJMsKW5fC_tTB3aYZme1LQn1mGKFCg`);
} else {
    console.log(`URL_API=https://dev.itsoft.vn/api/v1.0`);
    console.log(`URL_WSS=wss://dev-api.itsafe.vn/v1/graphql`);    
    console.log(`URL_UTILS=https://dev-utils.itsafe.vn`);
    console.log(`GOOGLE_API_TOKEN=AIzaSyA05tJMsKW5fC_tTB3aYZme1LQn1mGKFCg`);
}