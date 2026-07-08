import { Button } from "@ui/index"
import { useProject} from "../../../contexts/ProjectContext";

export function SaveButton() {
    
    const { project } = useProject();

    const save = () => { 
        const blob = project.boxGraph.toArrayBuffer();
    }
    
    return (
       <Button htmlType="button"> Save </Button>
    );
}