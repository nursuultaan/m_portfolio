import React, { useEffect, useRef } from 'react';
import Matter, { Mouse, MouseConstraint } from "matter-js";
import { AboutMeProps } from "../util/types.ts";

import nodeJSImg from "../assets/nodejs.svg";
import reactJSImg from "../assets/react.svg";
import typescriptImg from "../assets/typescript.svg";
import sqlImg from "../assets/sql.png";
import springBoot from "../assets/spring-boot.svg";
import htmlImg from "../assets/html.svg";
import cssImg from "../assets/css.svg";
import tailwindImg from "../assets/tailwind.svg";
import graphQLImg from "../assets/graphql.svg";
import javaImg from "../assets/java.svg";
import nextJSImg from "../assets/nextjs.png";
import  reduxImg from "../assets/redux.png";
import firebaseImg from "../assets/firebase.png";
import mongoDBImg from "../assets/mongodb.svg";

import Typewriter from 'typewriter-effect';
import {Button} from "antd";

import resume from "../assets/resume.pdf";


const AboutMe: React.FC<AboutMeProps> = ({selectedKey}) => {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!sceneRef.current) return ;
        // Create an engine
        const engine = Matter.Engine.create();
        const world = engine.world;

        const {width,height } = sceneRef.current.getBoundingClientRect();


        // Create a renderer
        const render = Matter.Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent',
            }
        });

        // Create balls (Node.js logos)
        const balls:Matter.Body[] = [];

        const skillsImgs =[reactJSImg,nodeJSImg,sqlImg,typescriptImg,springBoot,htmlImg,cssImg,tailwindImg,graphQLImg,javaImg,nextJSImg,reduxImg,firebaseImg,mongoDBImg]
        for (let i = 0; i < skillsImgs.length; i++) {
            const ball = Matter.Bodies.circle(Math.random() * 800, Math.random() * 600, 30, {
                restitution: 1.0, // High restitution for bouncing effect
                friction: 0.2, // Moderate friction to simulate rubber-like behavior
                frictionAir: 0,
                render: {
                    sprite: {
                        texture: skillsImgs[i], // Replace with the path to the Node.js logo image
                        xScale: 1,
                        yScale: 1,
                    }
                }
            });
            balls.push(ball);
        }

        // Add all of the bodies to the world
        Matter.World.add(world, balls);

        // Create ground and walls
        const ground = Matter.Bodies.rectangle(width / 2, height , width,1, { isStatic: true,  render: {
                fillStyle: 'transparent', // Make the ground transparent
            } });

        const left = Matter.Bodies.rectangle(0,height/2,1,height,{isStatic:true
        ,render:{
            fillStyle:"transparent"
            }});
        const right = Matter.Bodies.rectangle(width , height / 2, 1, height, { isStatic: true , render:{
            fillStyle:"transparent"
        }});
        const top = Matter.Bodies.rectangle(width/2,0,width,1,{ isStatic: true , render:{
                fillStyle:"transparent"
            }});


        Matter.World.add(world, [ground,left,right,top]);

        //Add mouse
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        // Add the mouse constraint to the world
        Matter.World.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;


        // Create a runner
        const runner = Matter.Runner.create();

        // Run the engine
        Matter.Runner.run(runner, engine);

        // Run the renderer
        Matter.Render.run(render);

        Matter.Events.on(mouseConstraint, "mousemove", function(event) {
            const { mouse } = event.source;
            const isBallHovered = balls.some(ball => Matter.Bounds.contains(ball.bounds, mouse.position));
            render.canvas.style.cursor = isBallHovered ? 'grab' : 'default';
        });

        // Cleanup on component unmount
        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
            Matter.Runner.stop(runner); // Stop the runner
            render.canvas.remove();
            render.canvas = null!;
            render.context = null!;
            render.textures = {};
        };
    }, [selectedKey]);

    return (
        <div className="container  relative flex justify-center items-center h-full w-[100%]  ">
            <div className=" absolute z-10 flex text-lg  flex-col text-center items-center">
                <h1 className="text-6xl font-mono font-semibold">
                    <Typewriter
                        options={{ cursor: "" }}
                        onInit={(typewriter) => {
                            typewriter.typeString('Welcome :)')
                                .pauseFor(1000)
                                .callFunction(() => {
                                    console.log('First string typed out!');
                                })
                                .start();
                        }}
                    />
                </h1>

                <p className="about-me w-7/12 p-3">
                    <span className="block">
                        My name is Sultan.
                    </span>

                    I am a software Engineer with 3+ years of experience in developing
                    high-performance, scalable web applications. Specializing in React.js,
                    Node.js, and Spring Boot, I leverage my expertise to deliver efficient,
                    maintainable, and user-friendly solutions.
                </p>
                <a href={resume} download>
                    <Button className={"font-mono text-base px-3"}>Resume</Button>
                </a>
            </div>
            <div ref={sceneRef} className=" absolute h-full w-full"></div>
        </div>
    );
};

export default AboutMe;
