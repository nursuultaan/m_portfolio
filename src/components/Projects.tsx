
import {Project, ProjectProps} from "../util/types.ts";
import React, {useEffect, useState} from "react";
import {GithubOutlined, LinkOutlined} from "@ant-design/icons";
import IphoneVideo from "../assets/iphone.mp4"
import pizzaVideo from "../assets/pizza.mp4"
import karavanVideo from "../assets/karavan.mp4"
import ReactPlayer from "react-player";

const initialProjects = [
    {
        key:"3",
        title: "iPhone Page",
        desc: "A React and Framer Motion-based website featuring a 3D model of the iPhone. Users can select different colors and sizes of the phone. This project demonstrates interactive UI elements and smooth animations.",
        video: IphoneVideo,
        githubLink: "https://github.com/nursuultaan/iphoneCLoneApp",
        websiteLink: "https://myphone1234.netlify.app/"
    },
    {
        key:"4",
        title: "Pizza Store",
        desc: "A React and JavaScript-based application styled with Tailwind CSS. It is a simple delivery and store application that allows users to browse and order pizza. This project includes functionality for selecting and customizing pizza orders.",
        video: pizzaVideo,
        githubLink: "https://github.com/nursuultaan/Pizza-React-Project",
        websiteLink: "https://heroic-pie-1edb6b.netlify.app/"
    },
    {
        key:"5",
        title: "Karavan Website",
        desc: "Developed an e-commerce platform using C# and .NET for the backend with a REST API. The frontend is built with React.js, ensuring a dynamic and user-friendly interface. Integrated AWS S3 for image storage and MySQL for efficient database management. The application offers a seamless experience for users to browse and shop online \n Did not deploy fully.",
        video: karavanVideo,
        githubLink: "https://github.com/nursuultaan/karavan01",
        websiteLink: "#"
    },
]


const Projects:React.FC<ProjectProps> = ({selectedKey}) => {



    const [projects] = useState<Project[]>(initialProjects);

    const [currProject ,setCurrProject]= useState(projects[0]);

    useEffect(()=>{

        const index :number = Number(selectedKey) -2 -1;

        setCurrProject(projects[index])
    },[selectedKey]);


    return (
        <div className={"container projects w-full h-full  flex  gap-10 bg-yellow-300"}>


           <div className={"flex-1 text-base p-8  flex flex-col justify-center  gap-5 "}>
               <h1 className={"text-4xl"}>{currProject.title}</h1>
               <p>{currProject.desc}</p>
               <ul className={"flex text-3xl gap-4"}>
                   <li>
                       <a href={currProject.githubLink}> <GithubOutlined/></a>
                   </li>
                   <li>
                       <a href={currProject.websiteLink}> <LinkOutlined /></a>
                   </li>
               </ul>
           </div>

            <div className={"tv flex-1 p-3  flex flex-col justify-center r" }>

                {/*<video className={"border-black border-2"} src={currProject.video} loop={true} autoPlay={true}>*/}
                {/*</video>*/}

                <ReactPlayer   className={"object-fit border-black border-2 p-1 bg-black"} controls={true}  loop={true} playing={true} url={currProject.video} />
                <div className={"flex items-center flex-col"}>
                    <div className={"w-1/12 h-[40px] bg-black"}></div>
                    <div className={"w-4/6 h-[30px] bg-black"}></div>
                </div>
            </div>


        </div>
    );
};

export default Projects;