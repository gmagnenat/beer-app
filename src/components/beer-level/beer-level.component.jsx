import React, { useState, useEffect } from 'react';
import Wave from 'react-wavify';
import ParticlesImport from '../particles-import/particle-import.component';
import './beer-level.styles.scss';

const BeerLevel = () => {
    const TEXTS = [
        "None, it's only Nine!",
        'Ok, Maybe a little bit.',
        'Wait I said a little bit',
        'Ugh nevermind...',
    ];
    const [value, setValue] = useState(0);
    const [index, setIndex] = useState(0);

    // Not used. Preparing for the text animation
    // const [prevIndex, updatePrevIndex] = useState(0);
    const [textToDisplay, updateTextToDisplay] = useState('');
    const [prevValue, updatePrevValue] = useState(0);
    const [pushWaves, updatePushWaves] = useState(false);
    const [glassFull, updateGlassFull] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            updatePushWaves(false);
        }, 3000);
        // if (index !== prevIndex) {
        //     updateTextAnimate(true);
        // }
        // check if the slider goes to the left
        if (value < prevValue) {
            updateTextToDisplay('Actually, I changed my mind.');
        } else {
            updateTextToDisplay(TEXTS[index]);
        }

        if (value >= 90) {
            console.log('hmm' + value);
            updateGlassFull(true);
        } else {
            console.log(value);
            updateGlassFull(false);
        }

        updatePrevValue(value);

        return () => clearTimeout(timer);
    }, [value, updateTextToDisplay, updatePushWaves]);

    const handleChange = (e) => {
        setValue(+e.target.value);
        setIndex(Math.floor(e.target.value / 33.3));
        updatePushWaves(true);
    };

    return (
        <div className="wrapper">
            <div
                className={
                    'glass-full' + (glassFull ? ' show-foam' : ' remove-foam')
                }
            >
                <img src="../../img/foam.svg" alt="" />
            </div>
            <div
                className="beer-down"
                style={{
                    height: `${value + 5}vh`,
                }}
            >
                <ParticlesImport />
                <div
                    className={
                        'wave-one' + (pushWaves ? ' show-wave' : ' remove-wave')
                    }
                >
                    <Wave
                        fill="#f2994a"
                        paused={false}
                        options={{
                            height: 20,
                            amplitude: 30,
                            speed: 0.15,
                            points: 3,
                        }}
                    />
                </div>
                <div
                    className={
                        'wave-two' + (pushWaves ? ' show-wave' : ' remove-wave')
                    }
                >
                    <Wave
                        fill="#d38037"
                        paused={false}
                        options={{
                            height: 20,
                            amplitude: 30,
                            speed: 0.2,
                            points: 4,
                        }}
                    />
                </div>
            </div>
            <div className="beerLevel">
                <header className="header">
                    <div className="page-title">
                        <div id="mdiv">
                            <div className="mdiv">
                                <div type="button" className="md"></div>
                            </div>
                        </div>
                        <h1>Beer order</h1>
                    </div>
                    <h2>How much beer do you want?</h2>
                </header>

                <div className="slider">
                    <input
                        type="range"
                        id="sliderValue"
                        name="sliderValue"
                        min="0"
                        max="100"
                        value={value}
                        step="1"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="text-container">
                    <p>{textToDisplay}</p>
                </div>

                <footer className="footer">
                    <button
                        className="submit-button"
                        value={Math.floor(value / 10)}
                    >
                        Place your order
                        <div className="left-number">
                            <span>{Math.floor(value / 10)}</span>
                        </div>
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default BeerLevel;