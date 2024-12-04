import "./Slider.scss"

interface AppProps {
    slides: string[]
}


function App({slides}: AppProps) {
    return (
        <>
            <div className="slider">
                <div className="slide-track">
                    {slides.concat(slides).map((slide, index) => (
                        <div className="slide" key={index}>
                            <img
                                src={slide}
                                alt=""/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
