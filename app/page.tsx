import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home(){
  return (
    <div>
      <h1>Stephane Tchatchum Chassem</h1>
      <p>Software Engineer building for African technological independence</p>
      {
        projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
          />
        ))
      }
    </div>
  )
}