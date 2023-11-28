function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Bem vindo ao Leanizado</h2>
            <h3>{numQuestions} Teste suas habilidades</h3>
            <button className="btn btn-ui" onClick={()=>dispatch ({type: "start"}) }>Começar</button>
        </div>
    )
}

export default StartScreen
