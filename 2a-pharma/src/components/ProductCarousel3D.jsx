"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductCarousel.module.css";

export default function ProductCarousel3D({ products }) {

  const circleRef = useRef(null);

  const rotation = useRef(0);
  const velocity = useRef(0);

  const dragging = useRef(false);
  const moved = useRef(false);

  const startX = useRef(0);

  const [hover, setHover] = useState(false);
  const [radius, setRadius] = useState(450);


  // responsive radius
  useEffect(() => {

    const updateRadius = () => {

      if (window.innerWidth < 600) {
        setRadius(230);
      }
      else if (window.innerWidth < 1000) {
        setRadius(330);
      }
      else {
        setRadius(450);
      }

    };


    updateRadius();

    window.addEventListener(
      "resize",
      updateRadius
    );


    return () => {
      window.removeEventListener(
        "resize",
        updateRadius
      );
    };


  }, []);



  // animation loop
  useEffect(() => {

    let frame;


    const animate = () => {


      // autoplay
      if (!dragging.current && !hover) {

        velocity.current = 0.08;

      }


      rotation.current += velocity.current;


      // inertia
      velocity.current *= 0.94;



      if(circleRef.current){

        circleRef.current.style.transform =
          `rotateY(${rotation.current}deg)`;

      }


      frame = requestAnimationFrame(animate);

    };


    animate();


    return () => {
      cancelAnimationFrame(frame);
    };


  }, [hover]);





  const pointerDown = (e) => {

    dragging.current = false;
    moved.current = false;

    startX.current = e.clientX;

  };





  const pointerMove = (e) => {


    const diff =
      e.clientX - startX.current;



    if(Math.abs(diff) > 5){

      dragging.current = true;
      moved.current = true;

    }



    if(!dragging.current)
      return;



    rotation.current += diff * 0.25;

    velocity.current = diff * 0.25;


    startX.current = e.clientX;


  };





  const pointerUp = () => {


    setTimeout(()=>{

      dragging.current = false;

    },100);


  };





  return (

    <div

      className={styles.scene}

      onMouseEnter={() => setHover(true)}

      onMouseLeave={() => {

        setHover(false);
        dragging.current = false;

      }}


      onPointerDown={pointerDown}

      onPointerMove={pointerMove}

      onPointerUp={pointerUp}


    >


      <div

        className={styles.circle}

        ref={circleRef}

      >


        {products.map((product,index)=>{


          const angle =
            (360 / products.length) * index;



          return (

            <div

              className={styles.card}

              key={product.id}

              style={{

                transform:
                `
                rotateY(${angle}deg)
                translateZ(${radius}px)
                `

              }}

            >

              <ProductCard product={product}/>

            </div>

          );


        })}



      </div>


    </div>

  );

}