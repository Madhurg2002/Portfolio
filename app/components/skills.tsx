import React from "react";
import { useTiltEffect } from "./hooks";
import { SKILLS_DATA } from "../data";
import { SectionWrapper, Icon, ReactLogo } from "./utils";

export const Skills: React.FC = () => {
  const cardRefs = useTiltEffect();

  let refIndex = 0;

  return (
    <SectionWrapper id="skills" title="Core Skills">
      <div id="skills-container" className="space-y-10">
        {Object.entries(SKILLS_DATA).map(([category, skills]) => (
          <div key={category} className="skill-group-container">
            <h3 className="text-2xl font-semibold text-gray-300 mb-6 border-b border-gray-700 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 pt-8 bg-gray-800 rounded-xl text-center tilt-card transition duration-300 group react-logo-wrapper"
                  ref={(el) => (cardRefs.current[refIndex++] = el)}
                >
                  <img src={skill.icon} alt={skill.name} className="text-4xl mb-2 block mx-auto w-8 group-hover:text-green-400 transition duration-300" style={{ color: skill.color }} />
                  <p className="font-medium">{skill.name}</p>
                  <span className="skill-doc-link text-gray-500 hover:text-green-400 text-xs">
                    Docs <Icon name="arrow-up-right" className="w-3 h-3 ml-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
