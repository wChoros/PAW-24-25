import React, { useState } from 'react';
import "./style.sass"

const CounterPage = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div className="counter-page">
            <div className="counter-container">
                <h1 className="counter-title">React Counter</h1>

                <div className="counter-display">
                    <span className="counter-value">{count}</span>
                </div>

                <div className="counter-controls">
                    <button className="counter-button decrement" onClick={decrement}>
                        Decrease
                    </button>
                    <button className="counter-button reset" onClick={reset}>
                        Reset
                    </button>
                    <button className="counter-button increment" onClick={increment}>
                        Increase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CounterPage;