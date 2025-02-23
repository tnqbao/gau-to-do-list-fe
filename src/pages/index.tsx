import TodoComponent from "@/components/todo";

const Home : React.FC = () => {
    return (
        <div className={"min-h-screen bg-black/90"}>
        <TodoComponent />
        </div>
    );
}

export default Home;