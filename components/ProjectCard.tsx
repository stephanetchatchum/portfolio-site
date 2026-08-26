export default function ProjectCard(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}