import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './User.css'
import axios from "axios";

function User(){

    const[file, setFile] = useState([])
    const location = useLocation()
    const{user} = location.state || ""
    const[imageUrl, setImageUrl] = useState("user.png")

    const navigate = useNavigate()

    const[title, setTitle] = useState("")
    const[body, setBody] = useState("")
    const[all, setAll] = useState([])


    useEffect(()=>{
        if(user==null){
            alert("Please login first")
            navigate("/account")
        }
    },[])

    const changeDp = ()=>{

        axios.get(`http://localhost:8080/get-dp?id=${user.id}`,{
            responseType : "arraybuffer"
        })
        .then((res)=>{
            const blob = new Blob([res.data], {type:"image/jpeg"})
            const url = URL.createObjectURL(blob)
            setImageUrl(url)
        })
    }

    useEffect(()=>{
        changeDp()
        
    },[])


   

    useEffect(()=>{
        axios.get("http://localhost:8080/all-blogs")
        .then((res)=>{
            setAll(res.data)
        })
    },[])


    const createBlog =()=>{
        if(title.trim()=="" || body.trim()==""){
            alert("Please write suitable title and content")
            return;
        }

        axios.post("http://localhost:8080/create-blog", {
            title: title,
            body: body,
            userId: user.id,
            userName: user.name
        })
        .then((res)=>{
            if(res.data){
                alert("Blog posted successfully")
            }
            else{
                alert("Something went wrong")
            }

            setTitle("")
            setBody("")
        })

    }


    const uploadDp =(e)=>{

        const form = new FormData()
        form.append("id", user.id)
        form.append("file", e.target.files[0])

        axios.post("http://localhost:8080/upload-dp", form, {
            header:{
                "Content-type" : "multipart/form-data"
            }
        })
        .then((res)=>{
            if(res.data){
                alert("Profile picture uploaded successfully")
            }

            else{
                alert("Please choose the picture only")
            }
        })
        
        changeDp()
    }


  

    return ( <>
        <div id="gparent">
            <header>
                <h3>Hey, {user.name}</h3>
                <div id="hparent">
                    <div id="hchild"></div>
                    <button>Logout</button>
                </div>
            </header>
        </div>
        
           
        
        <div id="u-main">
            <div id="u-profile">
                <img 
                style={{"cursor":"pointer"}}
                src={imageUrl} 
                alt="" 
                id="dp"
                />

                <input
                type="file"
                value={file}
                onChange={(e)=> {
                    //console.log(e)
                    //setFile(e.target.files[0])
                    uploadDp(e)
                }}
                />

                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>

            <hr />

            <div id="u-blogs">
                <h4>All posted blogs</h4>

                {all.map((blog, idx)=> 
                    <div className="blog" key={idx}>
                        <h4>Title: {blog.title}</h4>
                        <p className="para">Author: {blog.userName}, Posted Date: {blog.date}, Time: {blog.time}</p>
                        <p>{blog.body}</p>
                    </div>
                )}

            </div>

            <hr />

            <div id="u-create">
                <h4>Post a new blog</h4>

                <input 
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                type="text" 
                placeholder="enter the title of your blog"

                />

                <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder="write the content here....">
                    
                </textarea>

                <button onClick={createBlog}>Post</button>
            </div>


        </div>


        

    </>);
        
    
}

export default User;