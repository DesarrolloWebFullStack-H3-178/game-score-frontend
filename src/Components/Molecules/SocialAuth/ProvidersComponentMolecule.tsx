import GoogleComponentAtom from "game-score-frontend/Components/Atoms/Buttons/GoogleComponentAtom";
import GitHubComponentAtom from "game-score-frontend/Components/Atoms/Buttons/GitHubComponentAtom";
export default function ProvidersComponentMolecule() {
    return (
        <>
            <div className="btn-wrapper text-center">
                    <GitHubComponentAtom />
                    <GoogleComponentAtom />
            </div>
        </>
    )
}