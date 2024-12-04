import './App.sass'
import MenuHeader from "./MenuHeader";
import Slider from "./Slider";
import Footer from "./Footer";
import Brainrot from "./Brainrot";

function App() {
    const slides = [
        "slider/1.png",
        "slider/2.png",
        "slider/3.png",
        "slider/4.png",
        "slider/5.png",
        "slider/6.png",
        "slider/7.png"
    ]
  return (
    <>
        <MenuHeader pageName="Moja strona"/>
        <Slider slides={slides}></Slider>
        <div className="brainrot-container">
            <Brainrot link="https://www.youtube.com/embed/Q2vdm_VnpAk?si=3BumTnAcrgiG1l6V"></Brainrot>
            <Brainrot link="https://www.youtube.com/embed/s600FYgI5-s?si=_ZWOH45qvL2hkWvu"></Brainrot>
        </div>
        <Footer creatorName="Wojtek Choros"></Footer>
    </>
  )
}

export default App
