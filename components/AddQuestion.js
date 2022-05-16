export default function AddQuestion(){


    return(
        <div>
                <textarea id={"platform"}></textarea>

                <button onClick={function (){
                    const a = document.getElementById("platform");
                    a.innerText = "LeetCode"
                }}>LeetCode</button>
                <button onClick={function (){
                    const a = document.getElementById("platform");
                    a.innerText = "CodeChef"
                }}>CodeChef</button>
                <button onClick={function (){
                    const a = document.getElementById("platform");
                    a.innerText = "CodeForces"
                }}>CodeForces</button>
                <button onClick={function (){
                    const a = document.getElementById("platform");
                    a.innerText = "HackerEarth"
                }}>HackerEarth</button>
                <p/>
                <textarea id={"QuestionTitle"} placeholder={"QuestionTitle"} ></textarea><p></p>
                <textarea id={"Question"} placeholder={"Question"}></textarea><p></p>
                <textarea id={"Solution"} placeholder={"Solution"}></textarea><p></p>
                <textarea id={"MetaTags"} placeholder={"MetaTags"}></textarea><p></p>

                <button onClick={function (){
                    const data = {
                        platform: document.getElementById("platform").value,
                        QuestionTitle: document.getElementById("QuestionTitle").value,
                        Question: document.getElementById("Question").value,
                        Solution: document.getElementById("Solution").value,
                        Views: 0,
                        MetaTags: document.getElementById("MetaTags").value,
                        MetaDescription:document.getElementById("QuestionTitle").value +  document.getElementById("platform").value + "solution on pro-sequence"
                    }

                    
                    add();



                }}>Add</button>



            </div> 
    )
}