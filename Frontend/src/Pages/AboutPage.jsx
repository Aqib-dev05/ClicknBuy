import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/layouts/Button";

import MyPic from "../assets/mypicAi.png"
import { Github,Globe, Linkedin,CodeXml,Hexagon ,BugOff} from "lucide-react";
const MyLinks = [
  {
    name: "GitHub",
    icon: <Github />,
    url: "https://github.com/Aqib-dev05",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin />,
    url: "https://www.linkedin.com/in/aqib-ali-37a6a3357",
  },
  {
    name: "Portfolio",
    icon: <Globe/>,
    url: "https://aqib-dev05-portfolio.vercel.app",
  },
];

const SERVICES = [
  {
    title: "Backend Development",
    icon:<Hexagon/>,
    description:
      "Developing secure and efficient server-side logic, database management, and API integrations using Node.js and Express.",
  },
  {
    title: "Frontend Development",
    icon:<CodeXml/>,
    description:
      "Crafting responsive, high-performance, and visually appealing user interfaces using React.js and modern CSS frameworks.",
  },

  {
    title: "Custom Development",
    icon:<BugOff/>,
    description:
      "Tailored web applications built with modern technologies to solve specific business challenges.",
  },
];

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Express.js",
  "Redux Toolkit",
  "REST APIs",
  "Git & GitHub",
];

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-red-600">M. Aqib Ali</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              A passionate Full Stack Developer dedicated to building
              high-quality e-commerce experiences and digital solutions.
            </p>

   <div className="flex justify-center items-center gap-3 w-full">
    {MyLinks.map((link, index) => (
      <span className="w-14 h-14 rounded-full hover:bg-red-600 transition-colors duration-200 hover:text-white bg-gray-800 flex items-center justify-center ">
        <a
        key={index}
        href={link.url}
        target="_blank"
        aria-label={link.name}
      >
        {link.icon}
      </a>
      </span>
    ))}
   </div>

          </div>
          <div className="flex-1">
            <div className="relative w-84 h-84 max-md:w-60 max-md:h-60 mx-auto">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src={MyPic}
                alt="M. Aqib Ali"
                className="relative z-10 rounded-full border-4 border-red-600 object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Technical <span className="text-red-600">Expertise</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {SKILLS.map((skill, index) => (
              <span
                key={index}
                className="px-6 py-2 cursor-default bg-white shadow-sm border border-gray-200 rounded-full text-gray-700 font-medium hover:border-red-600 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            What I <span className="text-red-600">Offer</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 text-white flex justify-center items-center text-4xl bg-red-600 mb-6 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Let's Build Something{" "}
            <span className="text-red-600">Great Together</span>
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Whether you have a question or want to start a project, I'm always
            open to discussing new opportunities.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors rounded-md font-semibold"
            >
              Contact Me
            </button>
            <Button text="Go Back" onClick={() => navigate(-1)} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
