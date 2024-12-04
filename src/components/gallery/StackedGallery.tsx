import { useAnimate } from "framer-motion";
import { useRef, useEffect } from "react";

export default function StackedGallery({ title, data, rotationRange=3 }) {
  return (
    <ImageStack
      rotationRange={rotationRange}
      data={data}
    >
      <section className="grid h-dvh w-full place-content-center bg-white cursor-default">
        <div className="items-center align-middle gap-2 text-neutral-800 text-wrap text-center m-24">
          <p className="text-xl font-bold uppercase">{title}</p>
          <p className="text-sm font-light lowercase">touch or click screen</p>
        </div>
      </section>
    </ImageStack>
  );
};

const ImageStack = ({
  children, 
  data, // List of image sources with metadata (title, description, media, src, placeholderBlur, alt)
  rotationRange, // images will be rotated randomly between zero and rotationRange, alternating between negative and positive
}) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  useEffect(() => {
    lastRenderPosition.current = { x: window.innerWidth/2, y: window.innerHeight/2 };
  }, []);

  const handleMouseClick = (e) => {
    nextImage();
  }

  const nextImage = () => {
    const imageIndex = imageRenderCount.current % data.length;
    const selector = `[image-mouse-move-index="${imageIndex}"]`;

    const img = document.querySelector(selector);
    const w = window.innerWidth;
    const h = window.innerHeight;
    img.style.left = `${w/2}px`;
    img.style.top = `${h/2}px`;
    img.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
            ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 50, stiffness: 500 }
    );

    const cap = document.querySelector(`[caption-mouse-move-index="${imageIndex}"]`)
    cap.style.zIndex = imageRenderCount.current.toString();
    cap.style.opacity = 1;

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  const previousImage = () => {
    if (imageRenderCount.current <= 0) return;
    
  }

  return (
    <div
      ref={scope}
      className="relative overflow-hidden h-dvh flex justify-center items-center"
      onMouseDown={handleMouseClick}
    >
      {children}

      {data.map((item, index) => (
        <div key={index}>
          <img
            className="pointer-events-none absolute max-h-[60vh] max-w-[80vw] object-contain opacity-0"
            src={item.src}
            alt={item.alt}
            image-mouse-move-index={index}
          />
          <div 
            className="absolute inset-x-0 bottom-0 text-center h-[10vh] object-cover opacity-0 text-neutral-800 bg-white"
            caption-mouse-move-index={index}
          >
            <span className="font-bold">{item.title} - </span>
            <span className="font-normal">{item.tool}</span>
            <div className="font-light">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};