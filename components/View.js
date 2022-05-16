import React, {useState, useEffect} from "react";
import ViewQuestion from "./ViewQuestion";
import Head from "next/head";




function View(props){
    const TotalQuestions = props.TotalQuestions;
    const QuestionList = props.QuestionList;
    const platform = props.platform;
    const totalPages = Math.ceil(TotalQuestions/10);
    const pageId = props.pageId;

    console.log("totalPages", totalPages);
    var x =1;
    var y =2;
    if(totalPages < 5){
        x = 1
        y = totalPages
    }
    else if(pageId < 3){
        x = 1
        y = 5
    }
    else if(pageId > totalPages - 3){
        x = totalPages - 4
        y = totalPages
    }
    else{
        x = pageId - 2
        y = pageId + 2

    }
    

    var pagination = []
    for (let i =x; i < y + 1; i++) {
        if(pageId === i){
            pagination.push(<a href = {"/" + platform + "?page=" + i}>
        <li className="page-item">
            <div className="page-link rounded-circle" id={i}> {i} </div>
        </li></a>
        );
        }
        else{
            pagination.push(<a href = {"/" + platform + "?page=" + i}>
        <li className="page-item">
            <div className="page-link" id={i}> {i} </div>
        </li></a>
        );
        }


    }
    var render = []


    for(let i=0; i < QuestionList.length; i++){
        var link = "/" + platform + "/" + QuestionList[i]["QuestionTitle"]
        render.push(<ViewQuestion index = {i+1 + (props.pageId-1)*10} questiontitle = {QuestionList[i]["QuestionTitle"]} views = {QuestionList[i]["Views"]} link  = {link}/>)

    }


    return(
        <div>


            <Head>
                <title>{ platform + " Solutions on pro-sequence"  }</title>
                <meta
                    name = "description"
                    content = {"Get all " + platform + " Solution at one place and learn DSA at pro-sequence"}>
                </meta>
                <meta property="og:url" content={"https://www.pro-sequence.tech/" + platform}/>
                <meta property="og:site_name" content="pro-sequence"/>
                <link rel="canonical" href={"https://www.pro-sequence.tech/" + platform}/>
                <meta
                    name = "keywords"
                    content = {platform + "," + platform + " solutions" + ", pro-sequence solutions"}>
                </meta>
            </Head>

            <div className="list-group w-75 p-3 mx-auto mt-5 " id = "renderlist">
                {
                    render

                }


            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center code">
                    {pagination}
                </ul>
            </nav>




        </div>

    )
}



export default View;
