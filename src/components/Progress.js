// Função para mostrar progresso do usuário

function Progress({index, numQuestions, points, maxPossiblePoints,answer}) {
    return (
        
        <header className="progress">

            <progress max={numQuestions} value={index + Number(answer !== null)}/>

            <p>Perguntas <strong>{index+1}</strong> /{numQuestions}</p>

            <p><strong>{points}</strong>/ {maxPossiblePoints} pontos </p>
        </header>
    )
}

export default Progress
