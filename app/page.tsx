import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home(){
  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600">
        Stephane Tchatchum Chassem
      </h1>
      <p>Software Engineer building for African technological independence</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        { projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
            />
          ))
        }
      </div>
    </div>
  )
}