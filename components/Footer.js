import React from "react";


export default function Footer(){

    

    return(
        <footer className="bg-dark text-center text-white ">

            <div className="container p-4 pb-0">
                <section className="">
                    <form action="">

                        <div className="row d-flex justify-content-center">
                            <div className="row-auto">
                                <p className="pt-2">

                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>

                            <div className="col-md-5 col-12">
                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="Email" className="form-control" placeholder={"Email Address"}/>

                                </div>
                            </div>



                            <div className="col-auto">
                                <div className="btn btn-outline-light mb-4" onClick={async function (){

                                    //Lowercase all the incoming emails
                                    const data = {
                                        Email: document.getElementById("Email").value

                                    }


                                    const addEmail = await fetch("/Email", {
                                        method: "post",
                                        headers: {
                                            'Content-Type' : 'application/json'
                                        },
                                        body: JSON.stringify(data)
                                    })
                                    alert("Thank you for subscribing");
                                }}>
                                    Subscribe
                                </div>
                            </div>
                        </div>
                        <ul className="nav nav-pills nav-fill">
                            <li className="nav-item">
                                <a className="nav-link maintitle" href="/">pro-sequence</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/LeetCode">LeetCode</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/CodeChef">CodeChef</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/CodeForces">CodeForces</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/HackerEarth">HackerEarth</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Placement">Placement</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Tutorial">Tutorial</a>
                            </li>
                            
                            

                        </ul>
                    </form>
                </section>

            </div>
            <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.4)" }}>
                <strong >Contact Us: <a href = "mailto:contact@pro-sequence.tech">contact@pro-sequence.tech</a></strong>
            </div>

            <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.8)" }}>
                © 2021 Copyright: {" "}
                <a className="text-white" href="https://www.pro-sequence.tech/">pro-sequence.tech</a>
            </div>
        </footer>
    )
}
