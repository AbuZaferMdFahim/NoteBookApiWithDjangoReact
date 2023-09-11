import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Note } from './components/note';

import './styles/main.css' 

const baseURL = 'http://localhost:8000/'

const App = () => {
  
  const [modalvisible,setModalVisible] = useState(false);
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [posts, setPosts] = useState([]);
  

  const createNote = async (event) =>{
    event.preventDefault();

    const new_request = new Request(
      `${baseURL}/posts/`,
      {
        body:JSON.stringify({title,content}),
        headers:{
            'content-type':'Application/Json'
        },
        method:'POST'
      }
    );
    const response = await fetch(new_request);
    const data = await response.json();

    if (response.ok){
      console.log(data)
    }
    else{
      console.log('Failed')
    }
    
    setTitle('')
    setContent('')
    setModalVisible(false)
    getAllPosts()
  }

  const getAllPosts = async() =>{
    const response = await fetch(`${baseURL}/posts/`);
    const data = await response.json()

    if (response.ok){
      console.log(data)
      setPosts(data)
    }
    else{
      console.log("Failed")
    }
  }
  useEffect(
      ()=>{
        getAllPosts()
      },[]
  )
  const deleteItem= async (noteId)=>{
    console.log(noteId)
    const response = await fetch(`${baseURL}/posts/${noteId}/`,{
      method:'DELETE'
    })
    if (response.ok){
      console.log(response.status)
    }
    getAllPosts()
  }
  
  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <p className='title'>Guest Book</p>
        </div>
        <div className='add-section'>
          <a href='#' className='add-btn' onClick={()=>setModalVisible(true)} >Add Note</a>
        </div>
      </div>
      
      {posts.length>0?
        (<div className="post-list">
        {
            posts.map (
              (item)=>(
                <Note title={item.title} content={item.content} onclick = {()=>deleteItem(item.id)} key={item.id}/>
              )
            )
          }
        </div>)
        :(
        <div className='posts'>
          <p className='centerText'>No Posts</p>
        </div>
        )
      }
      <div className={modalvisible?'modal':'modal-not-visible'}>
        <div className='form'>
          <div className='form-header'>
            <div>
              <p className='form-header-text'>Create a Note</p>
            </div>
            <div>
              <a className='close-btn' onClick={()=>setModalVisible(!modalvisible)} href='#'>X</a>
            </div>
          </div>
          <form action=''>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} name='title' id='title' className='form-control' required/>
            </div>

            <div className='form-group'>
              <label htmlFor='content'>Content</label>
              <textarea name='content' id='' cols="30" value={content} onChange={(e) =>setContent(e.target.value)} rows="5" className='form-control' required></textarea>
            </div>
            <div className='form-group'>
              <input type='submit' className='btn' value='Save' onClick={createNote}/> 
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
