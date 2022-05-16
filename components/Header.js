import React from "react";
import Link from "next/link";
import Head from "next/head";

function Header(){




    return(

        
        <div className={"header sticky-top"}>
                    <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"/>
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#434647"/>
<meta name="msapplication-TileColor" content="#603cba"/>
<meta name="theme-color" content="#000000"/>
 
        </Head>





        <nav class="navbar navbar-light navbar-expand-lg" style={{"background-color":" #e3f2fd"}}>
                <div className="navbar-brand maintitle">
<a  href={"/"}>                <img src="/favicon-32x32.png" width="30" height="30" class="d-inline-block align-top" alt=""/><strong>Pro-Sequence</strong></a></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="justify-content-center collapse navbar-collapse " id="navbarText">
                    <ul className="navbar-nav md-auto nav-pills">
                        <li className="nav-item px-4 ">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/LeetCode"}>LeetCode</Link></b></div>
                        </li>
                        <li className="nav-item px-4">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/CodeChef"}>CodeChef</Link></b></div>
                        </li>
                        <li className="nav-item px-4">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/CodeForces"}>CodeForces</Link></b></div>
                        </li>
                        <li className="nav-item px-4">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/HackerEarth"}>HackerEarth</Link></b></div>
                        </li>
                        <li className="nav-item px-4">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/Placement"}>Placement</Link></b></div>
                        </li>
                        <li className="nav-item px-4">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/Tutorial"}>Tutorial</Link></b></div>
                        </li>
                        <li className="nav-item px-4">
                            <div className="nav-link"  style ={{"color": "black"}}><b><Link href={"/Codes"}>Codes</Link></b></div>
                        </li>
                        

                    </ul>
                    
                </div>

            </nav>

        </div>

    )


}



export default Header
