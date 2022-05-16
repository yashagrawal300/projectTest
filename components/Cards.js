function Card(arr, type){
    const data = []
    for(let i=0; i< arr.length; i++){
        data.push(

            <a href = {type + arr[i]["Subject"]} >
<div class="sizing p-4 m-3 bg-light text-dark blueshadow">
  <div class="container">
  <h5 className="card-title" style ={{"color": "black"}}><b>{arr[i]["Subject"]}</b></h5>

  </div>
</div>
</a>

        )
    }

    return (
        <div className={"d-flex justify-content-around flex-wrap p-2 "}>

            {
                data
            }
    </div>
    )
}



export default function Cards(props){
    const renderData = []
    const arr = props.data.subject;
    const newData = []
    var i = 0
 

    while(i < arr.length - arr.length%5){
        i+=5
        newData.push(Card(arr.slice(i-5, i), props.type))
        console.log(i-5, i);
    }
    newData.push(Card(arr.slice(arr.length - arr.length%5, arr.length), props.type))


        

    

    return (
        <div>

            {newData}
    </div>
    )


}
