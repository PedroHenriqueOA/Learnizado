import Email from "./Email";

function FinishScreen({points,maxPossiblePoints, dispatch}) {
    const percentage = (points/maxPossiblePoints) * 100;

    return (
        <>
    
            <p className="result">
                Pontuação: {points} / {maxPossiblePoints} ({Math.ceil(percentage)})%
            </p>

            <button className="btn btn-ui" onClick={() => dispatch({type: "restart"}) }>
                Tentar novamente
            </button>
                <Email/>
        </>
    );
};

export default FinishScreen
