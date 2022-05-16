export default function EngineeringQuestions(){


    return(
        <div>
        <nav className={"p-3"}>
            <div className="nav nav-tabs p-3 d-flex justify-content-center border border-success rounded" id="nav-tab" role="tablist">
                <a className="nav-item nav-link active font-weight-bold" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                   aria-controls="nav-home" aria-selected="true">Long Questions</a>
                <a className="nav-item nav-link  font-weight-bold" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                   aria-controls="nav-profile" aria-selected="false">Short Questions</a>

            </div>
        </nav>
    <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div id="accordion">
                <div className="card">
                    <div className="card-header " id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                         aria-expanded="true" aria-controls="collapseOne">
                        <h5 className="mb-0 text-wrap">
                                    This is the first long question

                        </h5>

                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                         data-parent="#accordion">
                        <div className="card-body">
                            Answer of this first question
                        </div>
                    </div>
                </div>
                <br/>
                <div className="card">
                    <div className="card-header " id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                         aria-controls="collapseTwo">
                        <h5 className="mb-0 text-wrap">
                            This is the first Second question

                        </h5>

                    </div>

                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordion">
                        <div className="card-body">
                            Answer of this first question
                        </div>
                    </div>
                </div>
                <br/>

            </div>
        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Must be going ont the computers</div>
        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">..Must be going ont the computers.</div>
    </div>
        </div>
    )


}
