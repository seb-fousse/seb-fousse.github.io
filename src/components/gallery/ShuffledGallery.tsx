import { motion, AnimatePresence } from "framer-motion";
import { Children, useEffect, useRef, useState, ReactNode, MouseEvent } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.ts";
import { ImageData } from "../../types/imageData.type";

const fullConfig = resolveConfig(tailwindConfig);

function getRandomCoordinate(width: number, height: number, imageSize: number, padX: number, padY: number) {
  console.log(padX, padY);
  return {
    x: Math.floor(Math.random() * (width - 2 * padX - imageSize) + padX),
    y: Math.floor(Math.random() * (height - 2 * padY - imageSize) + padY),
  };
}

function generateCoordinates(width: number, height: number, n: number, imageSize: number, padX: number, padY: number) {
  let coordinates = [];

  for (let i = 0; i < n; i++) {
    let newCoord = getRandomCoordinate(width, height, imageSize, padX, padY);
    coordinates.push(newCoord);
  }

  return coordinates;
}

interface ImageShuffleProps {
  children: ReactNode;
  data: ImageData[];
  delay: number;
}

const ImageShuffle = ({ children, data, delay }: ImageShuffleProps) => {
  const itemTransform = useRef("");
  const imageRenderCount = useRef(data.length);
  const [imageForModal, setImageForModal] = useState<ImageData | null>(null);
  const [delayChildren] = useState(delay);

  useEffect(() => {

    const mdBreakpoint = parseInt(fullConfig.theme.screens.md.slice(0, -2));
    const mdOrLarger = window.innerWidth >= mdBreakpoint;
    const imageSize = mdOrLarger ? 384 : 208; // TODO replace with pulling pixel size from config instead of hardcode

    const padX = 16;
    const padY = 16;
    const coordinates = generateCoordinates(
      window.innerWidth,
      window.innerHeight,
      data.length,
      imageSize,
      padX,
      padY
    );

    let itemPositions = data.map((_, index) => ({
      x: `${coordinates[index].x}px`,
      y: `${coordinates[index].y}px`,
      z: index,
    }));

    itemPositions.forEach((item, index) => {
      const element = document.querySelector(
        `[data-draggable-item-index="${index}"]`
      ) as HTMLElement;
      if (element) {
        element.style.left = item.x;
        element.style.top = item.y;
        element.style.zIndex = String(item.z);
      } else {
        console.warn(`Element with index ${index} not found`);
      }
    });
  }, []);

  const handleDragStart = (e: globalThis.MouseEvent) => {
    const target = e.target as HTMLElement;
    target.style.zIndex = String(imageRenderCount.current);
  };

  const handleDragEnd = (e: globalThis.MouseEvent) => {
    const target = e.target as HTMLElement;
    itemTransform.current = target.style.transform;
    imageRenderCount.current = imageRenderCount.current + 1;
  };

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    itemTransform.current = target.style.transform;
  };

  const handleMouseUp = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const index = Number(target.getAttribute("data-draggable-item-index"));
    if (itemTransform.current == target.style.transform) {
      // If mouse down and mouse up happen at the same location
      console.log("clicked", index, itemTransform.current);
      setImageForModal(data[index]);
    } else {
      console.log("dragged", index);
    }
  };

  // Define the stagger settings for the parent to the items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delayChildren,
        staggerChildren: 0.3,
      },
    },
  };

  // Define the animation for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative overflow-hidden h-screen w-screen flex justify-center items-center">
      {Children.map(children, (child) => (
        <div className={imageForModal ? "blur" : ""}>{child}</div>
      ))}
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((item: ImageData, index: number) => (
          <motion.div
            className="absolute flex justify-center align-middle text-center cursor-pointer"
            drag
            key={index}
            data-draggable-item-index={index}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            dragMomentum={false}
            variants={itemVariants}
          >
            <img
              className={`pointer-events-none object-contain ${
                imageForModal ? "blur" : ""
              } md:max-w-96 md:max-h-96 max-w-52 max-h-52`}
              width="1024"
              height="1024"
              src={item.src}
              alt={item.alt}
            />
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {imageForModal ? (
          <>
            <motion.div
              initial={{ opacity: 0 }} // Starting state for the animation
              animate={{ opacity: 1 }} // Final state for the animation
              exit={{ opacity: 0 }}    // Exit state for the animation
              transition={{ duration: 0.2 }} // Animation duration
              className="flex flex-col fixed justify-center items-center text-center inset-0 z-[10001] p-16"
            >
              <motion.button
                className="absolute top-4 right-4 text-xl font-bold p-2"
                onClick={() => {
                  setImageForModal(null);
                }}
                whileHover={{rotate: -360}}
                transition={{repeat: Infinity, duration: 4, ease: "linear"}}
              >
                &#x2715;
              </motion.button>
              <img
                className="max-w-full max-h-full object-contain p-4 pointer-events-none"
                width="1024"
                height="1024"
                src={imageForModal.src}
                alt={imageForModal.alt}
              />
              <div>
                <span className="font-bold">{imageForModal.title} - </span>
                <span className="font-normal">{imageForModal.tool}</span>
              </div>
              <div className="font-light">{imageForModal.description}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[10000] bg-white"
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

interface ShuffledGalleryProps {
  title: string;
  subtitle: string;
  data: ImageData[];
  delay: number;
}

function ShuffledGallery({ title, subtitle, data, delay }: ShuffledGalleryProps) {
  return (
    <ImageShuffle data={data} delay={delay}>
      <section className="grid h-screen w-screen place-content-center bg-white cursor-default">
        <div className="items-center align-middle gap-2 text-wrap text-center m-24">
          <p className="text-xl font-bold uppercase text-neutral-800">
            {title}
          </p>
          <p className="lowercase font-light text-neutral-600">{subtitle}</p>
        </div>
      </section>
    </ImageShuffle>
  );
}

export default ShuffledGallery;