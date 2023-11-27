function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to react quiz</h2>
            <h3>{numQuestions} Questions to test your skills</h3>
            <button className="btn btn-ui" onClick={()=>dispatch ({type: "start"}) }>Start</button>
        </div>
    )
}

export default StartScreen
