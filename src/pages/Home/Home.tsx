import { MouseEvent, useEffect, useState } from 'react'

// Components
import TypewriterComponent from 'typewriter-effect';
import HomeMenuItem from '../../components/home/HomeMenuItem';
import SectionHeading from '../../components/home/SectionHeading';

// Hooks
import useDocumentTitle from '../../hooks/useDocumentTitle';

// Motion
import { AnimatePresence, motion } from 'framer-motion';

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
      timer = setTimeout(() => {
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
          <section id="splash" className="container sm:flex sm:mx-auto mb-24">
            <div className="flex flex-row flex-wrap mx-auto my-auto justify-start xl:justify-center">
              
              {/* Splash video */}
              <div id="splash-image-wrapper" className="p-4 mx-auto xl:mx-0">
                <img src={"images/home/splashImage512.webp"} width={512} height={512} />
              </div>
              
              {/* Title and links */}
              <motion.div 
                id="title-and-menu" 
                className="absolute bottom-0 left-0 sm:relative text-neutral-800 px-4 lg:px-8 lg:mx-28 xl:mx-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                
                {/* Intro */}
                <motion.div 
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
                </motion.div>

                {/* Name */}
                <motion.div 
                  id="name" className="font-bold text-7xl"
                  variants={itemVariants}
                >
                  <h1 className={styles.firstName}>
                    Seb<span className={styles.extra}>astien</span>
                  </h1>
                  <h1>
                    Foussé
                  </h1>
                </motion.div>

                {/* Links */}
                <motion.div 
                  id="splash-menu-wrapper" className="menu-wrapper py-4 xl:block hidden"
                  variants={itemVariants}
                >
                  <div id="splash-menu" className="space-y-8">
                    <HomeMenuItem text="*about" href="#about" onClick={handleScroll}></HomeMenuItem>
                    <HomeMenuItem text="*stuff" href="#stuff" onClick={handleScroll}></HomeMenuItem>
                    <HomeMenuItem text="*words" href="#words" onClick={handleScroll}></HomeMenuItem>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Downward Arrow */}
          <AnimatePresence>
            {showArrow && (
              <motion.div
                className="fixed bottom-5 right-5 m-1 md:m-3 text-5xl md:text-2xl animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                &darr;
              </motion.div>
            )}
          </AnimatePresence>

          {/* About section */}
          <section id="about" className="container mx-auto flex flex-col mb-24 px-4">
            <SectionHeading heading="*about" />
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
          </section>

          {/* Things section */}
          <section id="stuff" className="mb-24">
            <SectionHeading heading="*stuff" />
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
          </section>

          {/* Thoughts section */}
          <section id="words">
            <SectionHeading heading="*words" />
          </section>
        </main>
    </>
  );
}