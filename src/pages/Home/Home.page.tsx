import { MouseEvent, useEffect, useState } from 'react'

// Components
import TypewriterComponent from 'typewriter-effect';
import ExplodingTextLink from '@/components/ExplodingTextLink/ExplodingTextLink.component';
import HomeSection from './HomeSection.component';

// Hooks
import useDocumentTitle from '@/hooks/useDocumentTitle';

// Motion
import { motion as m } from "motion/react";
import { AnimatePresence } from 'motion/react';

// Styles
import styles from './Home.module.css'

export default function Home() {
  useDocumentTitle('Seb Fousse');

  const [showArrow, setShowArrow] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // https://reacthustle.com/blog/nextjs-scroll-to-element
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  // Used to present the user with a down arrow if they've been at the top for 6+ seconds
  useEffect(() => {
    let timer: number;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
        setShowArrow(false); // Reset the arrow visibility if user scrolls
      }
    };

    if (isAtTop) {
      // Start the timer only if the user is at the top
      timer = window.setTimeout(() => {
        setShowArrow(true);
      }, 6000); // 6 seconds
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer); // Clear the timer on cleanup
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAtTop]);

  return (
      <>
        <head>

          {/* TODO: Update header info */}

          {/* Primary Meta Tags */}
          <title>Seb Fousse</title>
          <meta name="title" content="Seb Fousse" />
          <meta name="robots" content="index, follow" />
          <meta name="description" content="Sebastien Fousse is a software engineer. His interests include coding, art, photography, and more." />
          <meta name="author" content="Seb Fousse" />
          <meta name="keywords" content="seb, fousse, sebastien, sebastian, programming, portfolio, creative, art, design, software" />
          {/* Open Graph Tags */}
          <meta property="og:title" content="Seb Fousse" />
          <meta property="og:site_name" data-page-subject="true" content="Seb Fousse" />
          <meta property="og:url" content="https://sebf.xyz" />
          <meta property="og:description" name="description" content="Sebastien Fousse is a software engineer. His interests include coding, art, photography, and more." />
          <meta property="og:image" content="" /> {/* TODO: Add image content here */}
          {/* Favicon & Device Viewport */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>

        <main className="max-w-7xl m-auto">
          
          {/* Splash section */}
          <section id="splash" className="container sm:flex sm:mx-auto">
            <div className="flex flex-row flex-wrap mx-auto my-auto justify-start xl:justify-center">
              
              {/* Splash video */}
              <div id="splash-image-wrapper" className="p-4 mx-auto xl:mx-0">
                <img src={"images/home/splashImage512.webp"} width={512} height={512} />
              </div>
              
              {/* Title and links */}
              <m.div 
                id="title-and-menu" 
                className="absolute bottom-0 left-0 sm:relative text-neutral-800 px-4 lg:px-8 lg:mx-28 xl:mx-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                
                {/* Intro */}
                <m.div 
                  id="intro" className="text-2xl mt-8"
                  variants={itemVariants}
                >
                  <TypewriterComponent
                    options={{
                      strings: ["Hey, I'm", "Hi, the name's", "What's up, you can call me", "Hello, I go by"],
                      cursor: "_",
                      delay: 65,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </m.div>

                {/* Name */}
                <m.div 
                  id="name" className="font-bold text-7xl"
                  variants={itemVariants}
                >
                  <h1 className={styles.firstName}>
                    Seb<span className={styles.extra}>astien</span>
                  </h1>
                  <h1>
                    Foussé
                  </h1>
                </m.div>

                {/* Links */}
                <m.div 
                  id="splash-menu-wrapper" className="menu-wrapper py-8 xl:block hidden"
                  variants={itemVariants}
                >
                  <div id="splash-menu" className="space-y-8">
                    <ExplodingTextLink text="*about" href="#about" onClick={handleScroll}></ExplodingTextLink>
                    <ExplodingTextLink text="*stuff" href="#stuff" onClick={handleScroll}></ExplodingTextLink>
                    <ExplodingTextLink text="*words" href="#words" onClick={handleScroll}></ExplodingTextLink>
                  </div>
                </m.div>
              </m.div>
            </div>
          </section>

          {/* Downward Arrow */}
          <AnimatePresence>
            {showArrow && (
              <m.div
                className="fixed bottom-5 right-5 m-1 md:m-3 text-5xl md:text-2xl animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                &darr;
              </m.div>
            )}
          </AnimatePresence>

          {/* About section */}
          <HomeSection id="about" heading="*about" className="mb-24">
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
              {/* Text Column */}
              <div className="flex-1 max-w-2xl space-y-4">
                <p>
                  Hey! I'm Sebastien, but you can call me <b>Seb</b>. I'm a Brooklyn-based software engineer currently working for TDSecurities. In my free time, I run a <a href="#">used book stand</a> and bounce around from hobby to hobby.
                </p>
                <p>
                  I was born and raised in London, studied CS and cognitive psychology at Northeastern University, but later transferred and completed a CS and math degree at NYU.
                </p>
              </div>
              {/* Image Column */}
              <div id="splash-image-wrapper" className="flex-shrink-0">
                <img 
                  src={"images/art/1024x1024/2.jpg"} 
                  width={750} 
                  height={750} 
                  className="rounded-lg"
                  alt="Splash image"
                />
              </div>
            </div>
          </HomeSection>

          {/* Things section */}
          <HomeSection id="stuff" heading="*stuff" className="mb-24">
            <div className="flex text-2xl">
              Check out some of my&nbsp;
              <TypewriterComponent 
                options={{
                  strings: ["projects", "hobbies", "work"],
                  cursor: "_",
                  delay: 65,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </HomeSection>

          {/* Thoughts section */}
          <HomeSection id="words" heading="*words">
          </HomeSection>
        </main>
    </>
  );
}