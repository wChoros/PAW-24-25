import './MenuHeader.sass'

interface AppProps {
    pageName: string
}

function App({pageName}: AppProps) {
    return (
        <>
            <header className="menu-header">
                <h1 className="page-title">{pageName}</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default App
