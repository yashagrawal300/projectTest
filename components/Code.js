import React, {useState, useEffect} from "react"
import Link from "next/link";




function Code(props){
    const changedata = props.changedata;
    const temp = []
    for(let i=0; i<changedata.length ; i++){

        temp.push(
            <>
                <Link href = {"/" + changedata[i]["platform"] + "/" + changedata[i]["QuestionTitle"]}>

                    <div className="btn btn-primary fixwidth shadow">
                        <div className={"anotherwrap"}>

                            {changedata[i]["QuestionTitle"] + " "}

                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
                            {changedata[i]["Views"]}

                        </div>


                    </div>

                </Link>
                <p/>
            </>
        )
    }



    return(
        <div>
            <div className="jumbotron jumbotron-fluid blueshadow">

                <div className="container">
                    <div className="d-flex justify-content-between">
                        <h2 className="display-6 text-xl-left">Python Code: </h2>
                        <p/>


                        <button data-bs-toggle="tooltip"
                                data-bs-placement="top" title="COPY CODE" style={{"border": "0" }}>
                            <svg className={"copybutton"} xmlns="http://www.w3.org/2000/svg" onClick={
                                //Copy button Code

                                function (){
                                    const el = document.createElement('textarea');
                                    el.value = props.solution;
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(el);



                                }
                            } style={{"align-self": "center" }}  height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

                        </button>

                    </div>

                    <p className="lead text-xl-left blueshadow">
                        <pre>
                        <code className={"text-danger"}>
                            {
                                props.solution
                            }
                        </code>
                        </pre>



                    </p>
                    <center>
                    <div className="btn btn-primary">
                        More Questions
                    </div>
                    </center>
                    <p/>

                    {
                        temp
                    }


                </div>
            </div>





        </div>
    )
}

export default Code;
