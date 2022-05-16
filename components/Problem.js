import Code from "./Code";
import BreadCrumb from "./BreadCrumb";
import Head from "next/head";
import { MathJax, MathJaxContext } from "better-react-mathjax";




function Problem({props}){
    const questiontitle = props.questiontitle;
    const config = {
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            processEscapes: true
    
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
        
      }



    const question = props.Question;
    const code = props.Solution;
    const views = props.Views;
    const tags = props.tags;

    var currentplatform = props.platform;

    const breadcrumbData = {
        Directory : [
            {
                Name: currentplatform,
                Link: "/" + currentplatform
            },
            {
                Name: questiontitle,
                Link: undefined
            }

        ],
        Views: views +1
    }

    
    var htmlObject = <div dangerouslySetInnerHTML={{__html: question}}/>


    return(
        <div>
            <Head>
                <title>{  questiontitle +" " +currentplatform + " Solutions on pro-sequence"  }</title>
                <meta
                    name = "description"
                    content = {question}>
                </meta>

                <meta httpEquiv="content-language" content="en-us"/>

                <meta property="og:site_name" content="pro-sequence"/>
                <link rel="canonical" href={"https://www.pro-sequence.tech/" + currentplatform  +"/"+  questiontitle}/>
                <link rel="alternate" href="https://www.pro-sequence.com" hrefLang="es-us"/>
                <meta property="og:locale" content="en_US"></meta>
                <meta property="og:type" content="article"></meta>

                <meta
                    name = "keywords"
                    content = { questiontitle  + " solution" + ", " + currentplatform + " solutions" + ", pro-sequence solutions, pro solutions, prose, sequence, solutions"}>
                </meta>
                <meta property="og:site_name" content={"https://www.pro-sequence.tech/" + currentplatform + "/" + questiontitle} />
                    <meta property="og:title" content={questiontitle + " problem solutions"} />
                    <meta property="og:url" content={"https://www.pro-sequence.tech/" + currentplatform  + "/" + questiontitle } />
                    <meta property="og:description" content={questiontitle  + " Want more solutions like this visit the website"} />


            </Head>
            <BreadCrumb data = {breadcrumbData}/>

            <div className="jumbotron jumbotron-fluid shadow">
                <div className="container">
                    <div className="d-flex justify-content-between">

                        <h1 className="display-6 text-xl-left">{questiontitle + " Solution"}</h1>

                    </div>

                    <p className="lead text-xl-left code">
                    <MathJaxContext config={config}>
                    <MathJax> {
                                htmlObject

                            }</MathJax>
                            </MathJaxContext>

                    </p>



                </div>
                <div className = "container">
                <div className="btn btn-primary wrapping shadow">
                    {
                        tags
                    }
                    </div>
                    </div>
            </div>
            <Code solution = {code} platform = {props.platform} changedata = {props.changedata}/>


        </div>
    )


}


export default Problem;
