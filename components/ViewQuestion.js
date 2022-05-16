import React from "react";



function ViewQuestion(props){
    var showViews;
    if(props.views !== undefined){
        showViews = <span className="badge badge-light ml-4 "><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" ><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
            {props.views}</span>
    }


    return(
        <div className={"shadow "} style ={{"color": "black"}}><b>

            <a href={props.link} className="list-group-item list-group-item-action d-flex justify-content-between text-dark">
                <div>

                <h2 className={"changeH2Size"}>

                    {
                        props.index + ".  "
                    }

                    {
                    props.questiontitle
                }
                </h2>

                </div>
                <div className = {"changeH2Size"}>
                    {showViews}
                </div>

            </a>
            <p/>
           </b>
        </div>


    )


}

export default ViewQuestion;
