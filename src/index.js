import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';
import Post from './components/Post';
import Alert from './components/Alert';

document.addEventListener('DOMContentLoaded', getPosts);

document.getElementById('create_post_form').addEventListener('submit', createPost);

const msg=document.querySelector('.msg');

function getPosts(){
    axios.get('http://localhost:5050/post').then(res => {
        Post.showPosts(res.data);  
    });
}

function createPost(e) {
    e.preventDefault();
    let form_data = new FormData(e.target);
    let data = Object.fromEntries(form_data.entries());

    if (data.name == '' || data.photo == '' ||data.content=='') {
        msg.innerHTML = Alert.danger('fill all please');
    } else {
        axios.post('http://localhost:5050/post', {
        name:data.name,
        photo:data.photo,
        content:data.content,
        post_photo:data.post_photo,
    }).then(res => {
        getPosts();
        msg.innerHTML=Alert.success('post created');
    });
  }

    
}