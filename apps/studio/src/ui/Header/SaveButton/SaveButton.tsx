import { Button } from "@ui/index"
import { useProject} from "../../../contexts/ProjectContext";
import { useTracks } from "../../../contexts/TracksContext";
import { saveProject } from "../../../api/saveProject"; 

export function SaveButton() {
    
    const { project } = useProject();
    const handleSave = async () => {
        try
        {
            const binaryProject = project.boxGraph.toArrayBuffer();
            const sampleUUIDS = project.collectSampleUUIDs();
            await saveProject( binaryProject, JSON.stringify(sampleUUIDS) )

        }
        catch( e )
        {
            console.log( e );
        }
    }
    
    return (
       <Button htmlType="button" onClick={handleSave} > Save </Button>
    );
}