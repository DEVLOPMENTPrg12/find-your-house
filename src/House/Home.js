
import { store } from "./redux/store";
import Nav from "./navigation/Nav";
import Section from "./Section/Section";
import Companies from "./companies/companies";
import Residencies from "./Residience/Residience";
import { Provider } from "react-redux";
import Value from "./Value/value";
import Getstarted from "../GetStarted/Getstarted";
import Footer from "../Footer/Footer";


export default function Home(){
    return(
        <div >
     
    <Nav/>
    <Section/>
    <div className="home">
    <Companies/>
    
    <Residencies/>
    <Value/>
    <Getstarted/>
    </div>
    
    
      </div>) 
    
}