import React from "react";
import Link from "next/link";

function imagerender(){
        return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
}



function BreadCrumb(props){
    // const questiontitle = props.questiontitle
    // const platform = props.platform
    // const views = props.views
    const lists = [];
    var showViews;

    const Directory = props.data["Directory"]
    const Views= props.data["Views"]

    for(let i=0; i<Directory.length; i++){
        let name = Directory[i]["Name"]
        let link = Directory[i]["Link"]

        if(link === undefined){

            lists.push(<li className="breadcrumb-item" aria-current="page">{name}</li>)
        }else{
            lists.push(<li className="breadcrumb-item"><u><Link href={link}>{name}</Link></u></li>)

        }
    }

    if(Views === undefined){
        showViews = <div/>
    }
    else{
        showViews = <span className="badge badge-light ml-5" id = "removeimage">{imagerender()}
            {Views}</span>

    }










    return(
        <div className={"mt-4 blueshadow"}>
            <nav aria-label="breadcrumb ">
                <ol className="breadcrumb">
                    {/*<li className="breadcrumb-item"><Link href={"/" + platform}>{platform}</Link></li>*/}
                    {/*<li className="breadcrumb-item" aria-current="page">{questiontitle}</li>*/}
                    {lists}
                    {showViews}
                </ol>

            </nav>




        </div>
    )
}
export default BreadCrumb;
