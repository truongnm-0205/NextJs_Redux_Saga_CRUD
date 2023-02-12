import axios from 'axios';
export async function getPosts(){
    
        const res = await axios.get("http://localhost:4000/api/v1/posts");
        
        return res.data.posts;

}

export async function getPost(id:any){
    console.log(123)
    const res = await axios.get(`http://localhost:4000/api/v1/posts/${id}`);
    return res.data.post;

}