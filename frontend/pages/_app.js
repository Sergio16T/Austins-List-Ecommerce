import App from 'next/app'; 
import { ApolloProvider } from 'react-apollo'; 
import Page from '../components/Page'; 

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}; 
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx); // crawl the pages fetch that data then return that data to this.props
        }
        pageProps.query = ctx.query; // this exposes the query to the user 
        return { pageProps}; //when you return here in getInitalProps it exposes it in props.. 
    }
    render() {
    const { Component, apollo, pageProps } = this.props; 
    return (
        <Page>
            <Component {...pageProps}/>
        </Page>      
    )
    }
}



export default MyApp;