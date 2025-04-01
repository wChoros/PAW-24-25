import "./style.sass"

const Menu = () => {
    return (
        <div className="menu">
            <div className='menuRecord'>
                <a href="/counter">
                    Counter
                </a>
            </div>
            <div className='menuRecord'>
                <a href="/slider">
                    Slider
                </a>
            </div>
            <div className='menuRecord'>
                <a href="/notepad">
                    Notepad
                </a>
            </div>
        </div>
    );
};

export default Menu;