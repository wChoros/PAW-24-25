import "./Brainrot.sass"

interface AppProps {
    link: string
}

function App({link}: AppProps) {
    return (
        <>
            <iframe src={link}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </>
    )
}

export default App
