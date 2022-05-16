export default function HomeCards(){


    return (
        <div className={"d-flex justify-content-around flex-wrap p-4 "}>
            <div className="card text-white bg-primary mb-3 changemaxwidth"  >
                <div className="card-body">
                    <h5 className="card-title">LeetCode Questions</h5>

                </div>
            </div>
            <div className="card text-white bg-secondary mb-3 changemaxwidth" >
                <div className="card-body">
                    <h5 className="card-title">HackerEarth Questions</h5>

                </div>
            </div>
            <div className="card text-white bg-success mb-3 changemaxwidth" >
                <div className="card-body">
                    <h5 className="card-title">CodeChef Questions</h5>

                </div>
            </div>
            <div className="card text-white bg-danger mb-3 changemaxwidth"  >
                <div className="card-body">
                    <h5 className="card-title">CodeForces Questions</h5>

                </div>
            </div>
        </div>
    )


}
