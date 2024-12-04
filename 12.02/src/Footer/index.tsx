import "./Footer.sass"

interface AppProps{
    creatorName: string
}

function App({creatorName}: AppProps) {
    return (
        <>
            <footer>
                <p>&copy; {creatorName}</p>
            </footer>
        </>
    )
}

export default App
