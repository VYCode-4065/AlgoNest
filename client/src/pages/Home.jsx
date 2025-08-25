import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import { useSelector } from "react-redux";

const Home = () => {
  const authValue = useSelector((state) => state.auth);

  const techLogos = [
    {
      name: "Node.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "React.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Express.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "MongoDB",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "JavaScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "HTML5",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Tailwind CSS",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png",
    },
    {
      name: "Redux",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "Next.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Angular",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg",
    },
    {
      name: "Vue.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Python",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Django",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    },
    {
      name: "Java",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "Spring Boot",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    },
    {
      name: "C++",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "Git",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Docker",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
  ];

  return (
    <div className="">
      <div className="bg-purple-800 text-slate-50 min-h-32 px-5 lg:px-10 py-10 md:py-16 text-center">
        <div className="inline-flex flex-col gap-5 lg:w-2xl items-center ">
          <h1 className="md:text-2xl lg:text-4xl font-semibold">
            Find the Best Courses for You
          </h1>
          <p className="text-purple-100 text-sm md:text-lg">
            Discover, Learn, and Upskill with our wide range of courses
          </p>
          <div className="w-full flex items-center justify-between border rounded-full  bg-slate-50 text-white overflow-hidden hover:shadow-lg   hover:shadow-purple-400  transition-all duration-200">
            <input
              type="text"
              placeholder="Search Courses"
              className="outline-none w-full pl-5 text-neutral-900"
            />
            <button className="h-full px-5 py-1 md:py-2 cursor-pointer bg-purple-800 hover:font-medium">
              Search
            </button>
          </div>
          <Button
            className={
              "!rounded-full !py-1 md:py-2  bg-blue-100 text-purple-600  w-fit font-semibold hover:scale-105 transition-transform duration-200"
            }
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="px-3 py-5">
        <h1 className=" md:text-2xl lg:text-3xl font-semibold text-center">
          Our Courses
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-10 md:px-5">
          {Array(20)
            .fill(1)
            .map((_, idx) => {
              return (
                <Card
                  name={techLogos[idx].name}
                  imageLink={techLogos[idx].img}
                  key={idx}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
