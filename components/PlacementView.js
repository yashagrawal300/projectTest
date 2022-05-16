import ViewQuestion from "./ViewQuestion";






export default function PlacementView(props){
    const temp = []
  

    for(let i = 0; i < props.Questions.length; i++){
        const link = props.answerUrl + props.Questions[i]["Question"].split(" ").join("-");
        // Insert ViewQuestion component into the thing

        temp.push(
            <ViewQuestion index = {i+1} views = {undefined} link={link} questiontitle = {props.Questions[i]["Question"]}/>
        )
    }




    return(
        <div className="list-group w-75 p-3 mx-auto mt-5 " >

            {temp}
        </div>
    )

}


