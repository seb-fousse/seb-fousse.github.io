import styles from './ExplodingTextLink.module.css'
import { MouseEventHandler } from 'react';

// Reworking of this effect
// https://www.youtube.com/watch?v=owpaafxvkjU

interface Props {
    text: string;
    href: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
}

export default function ExplodingTextLink({ text, href, onClick }: Props) {

    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const letters = text.split(""); // Split text into array of characteres
    const lettersAndDelay = []

    // Push an object to lettersAndDelay with a letter, random delay, and fixed delay
    for (let i = 0; i < letters.length; ++i) {
        let rd = `${rand(-5000, 0)}ms`
        let fd = `${i * 1000 }ms`
        lettersAndDelay.push({letter: letters[i], randomDelay: rd, fixedDelay: fd});
    }

    // Build out JSX for each letter in the HomeMenuItem
    const letterItems = lettersAndDelay.map((item) => (
        <span className="outer" key={item.fixedDelay}>
            <span className="inner" style={{animationDelay: item.randomDelay}}>
                <span className="letter" style={{animationDelay: item.fixedDelay}}>{item.letter}</span>
            </span>
        </span>
        )
    );

    return (
        <div className="font-medium text-5xl">
            <div className={styles.option}>
                <a className={styles.fancy} href={href} onClick={onClick}>
                    {letterItems}
                </a>
            </div>
        </div>
    );
}