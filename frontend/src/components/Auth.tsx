import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@avglinuxguy/common"
import axios from 'axios'
import { BACKEND_URL } from "../config"


export const Auth = ({type}: {type: "signup" | "signin"}) => {


    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`, postInputs
                
            )

            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs/1")
        }catch(e){
            console.log("error:",e)
            alert("Backend request failed")
        }
    }

    return <div className="h-screen ">
        <div>
            I'm auth
            <div className="bg-red-500 h-8 w-10">

            <Link to={"/signin"} >Login</Link>
            </div>
        </div>
        { type === "signup" ? 

        <LabelledInput label="Name" placeholder="Enter name" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
        }}/> : null}
        <LabelledInput label="Username" placeholder="Enter username" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                username: e.target.value
            })
        }}/>
        <LabelledInput label="password" type={"password"} placeholder="Enter password" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }}/>

        <button onClick={sendRequest}>
            {type === "signup" ? "Sign Up": "Sign in"}
        </button>

    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const LabelledInput = ({ label, placeholder, onChange, type}: LabelledInputType) => {
    return <div>
        <label>{label}</label>
        <input onChange={onChange} type={type || "text"} className="p-4 m-5 bg-red-200 text-blue-600" placeholder={placeholder} required/>

    </div>
}