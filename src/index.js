import React,{useState} from 'react';
import ReactDOM from 'react-dom';

import './styles/main.css' 

const App = () => {
  
  const [modalvisible,setModalVisible] = useState(false);
  
  return (
    <div>
      <div className='header'>
        <div className='logo'>
          <p className='title'>Guest Book</p>
        </div>
        <div className='add-section'>
          <a href='#' className='add-btn'>Add Note</a>
        </div>
      </div>
      <div className='posts'>
        <p className='centerText'>No Posts</p>
      </div>
      <div className='modal'>
        <div className='form'>
          <div className='form-header'>
            <div>
              <p className='form-header-text'>Create a Note</p>
            </div>
            <div>
              <a className='close-btn' href='#'>X</a>
            </div>
          </div>
          <form action=''>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' name='title' id='title' className='form-control'/>
            </div>

            <div className='form-group'>
              <label htmlFor='content'>Content</label>
              <textarea name='content' id='' cols="30" rows="5" className='form-control'></textarea>
            </div>
            <div className='form-group'>
              <input type='submit' className='btn' value='Save'/> 
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
