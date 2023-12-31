
import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { useState } from 'react';
import ReactPlayer from 'react-player'
import {connect} from 'react-redux'

import { Timestamp } from 'firebase/firestore';
import {postArticleAPI} from "../actions"

const PostModal = (props) => {

    const [editorText,setEditorText]=useState("");
const [shareImage,setShareImage]= useState("")
const [videoLink,setVideoLink]= useState("")
const [assetArea,setAssetArea]= useState("")

const [showfiles,setShowFiles]=useState(false)
const [showVideoLink,setShowVideoLink] =useState(false)

const handleFileShow =()=>{
    setShowFiles(!showfiles)
    setShowVideoLink(false);
}

const handleVideoLinkShow =()=>{
    setShowVideoLink(!showVideoLink)
    setShowFiles(false);
}

const handleCloseModal = () => {
    props.handleCloseModal();
  }

const handleChange = (e)=>{
    const image = e.target.files[0];
    
    if(image==="" || image=== undefined){
        alert(`not an image,the file is a ${typeof image}`)
        return;
    }
    console.log(image)

    setShareImage(image)

}

const switchAssetArea = (area)=>{
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
}

const postArtcle = (e) => {
    e.preventDefault(); // Use the event object to prevent default behavior
    if (e.target !== e.currentTarget) {
      return;
    }
  
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    };
  
    props.postArtcle(payload);
    reset(e);
  }
  

const reset =(e)=>{
    
    console.log("reset function called")
    setEditorText("")
    setShareImage("")
    setVideoLink("")
    setAssetArea("")
    handleCloseModal()
   
}

  return (
    <Container>

        <Content>
<Header>
    <h2>Create a post</h2>
    <button onClick={handleCloseModal}>
      <CloseIcon />
    </button>
</Header>
<SharedContent>
    <UserInfo>
        {props.user.photoURL ?  <img src={props.user.photoURL} alt="" /> :
        
        <img src='/images/user.svg' />
    }
       

        <span>{props.user.displayName}</span>
    </UserInfo>

  <Editor>
  <textarea value={editorText} 
  onChange={(e)=>setEditorText(e.target.value)}
   placeholder='What do you want to talk about?'
    autoFocus={true}>

    </textarea>

    <UploadImage>
<input type="file" accept='image/gif,image/jpeg,image/png'
name='image'
id="file"
style={{display:'none'}}
onChange={handleChange}

/>

{
    showfiles && <p>
    <button htmlFor="file"
    
    >  Select an image to share</button>
</p>
}
{
    shareImage && <img src={URL.createObjectURL(shareImage)}/>  


}
{
    showVideoLink && <input type="text"
    placeholder='Please input a video link' 
    value = {videoLink}
    onChange={(e)=>setVideoLink(e.target.value)}
    
    />
}

{videoLink && <ReactPlayer width={'100%'} url={videoLink}/>}
    </UploadImage>
  </Editor>
</SharedContent>
<ShareCreation>
<AttachAssets>

    <AssetButton>
   <PhotoSizeSelectActualIcon onClick={handleFileShow}/>
    </AssetButton>

    <AssetButton>
       <VideoCameraBackIcon onClick={handleVideoLinkShow}/>
    </AssetButton>

   
</AttachAssets>

<ShareComment>
<AssetButton>
       <CommentIcon/>
       Anyone
    </AssetButton>
</ShareComment>



<PostButton disabled={!editorText ? true : false}
 onClick={(e) => { postArtcle(e)}}
>Post
</PostButton>



</ShareCreation>
        </Content>
    </Container>
  )
}

const Container= styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    color: black;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;


`
const Content =styled.div`
width: 100%;
max-width: 552px;
background-color: white;
max-height: 90%;
overflow: initial;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
top: 32px;
margin: 0 auto;
`
const Header = styled.div`
display: flex;
padding: 16px 20px;

border-bottom: 1px solid rgba(0,0,0,0.15);
font-size: 16px;
line-height: 1.5;
color: rgba(0,0,0,0.6);
font-weight: 400;
justify-content: space-between;
align-items: center;

button{
    height: 40px;
    width: 40px;
    min-width: auto;
    background: none;
    border: none;
    
    color: rgba(0,0,0,0.15);

    &:hover{
        color:grey;
    }


}


`

const SharedContent = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
overflow-y:auto;
vertical-align: baseline;
background-color: transparent;
padding: 8px 12px;



`



const UserInfo = styled.div`
display: flex;
align-items: center;
padding: 12px 24px;

svg,img{
    width: 48px;
    height: 48px;
   background-clip: content-box;
   border-radius: 50%;
}

   span{
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;

   }



`
const ShareCreation = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 24px 12px 16px;

`
const AssetButton = styled.button`
display: flex;
align-items: center;
height: 40px;
min-width: auto;
background: none;
color:#0A66C2;
border: none;
/* color: rgba(0,0,0,0.5); */

`

const AttachAssets = styled.div`
display: flex;
align-items: center;
padding-right: 8px;

${AssetButton}{
    width: 40px;
}
`

const ShareComment = styled.div`

padding-left:8px;
margin-right: auto;
border-left: 1px solid rgba(0,0,0,0.15);

${AssetButton}{
    i{
        margin-right: 5px;
    }

}
    
`

const PostButton = styled.button`
min-width: 60px;
border-radius: 20px;
padding-left: 16px;
padding-right: 16px;
color: ${(props)=>( props.disabled ? "rgba(1,1,1,0.2)" : "white")};
background:${(props)=>( props.disabled ? "rgba(155, 152, 152, 0.8)" : " #0a66c2")};
&:hover{

    background:${(props)=>( props.disabled ? "rgba(155, 152, 152, 0.8)" : " #004182")} ;
}
`

const Editor = styled.div`
padding: 12px 24px;
textArea{
    width: 100%;
    min-height: 100px;
    resize: none;

    &:focus{
       border:2px solid #0A66C2;
       outline: none;
    }

   


}


input{
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;


}
`
 
const UploadImage = styled.div`
    text-align: center;
    img{
        width: 100%;

    }
`

const mapStateToProps =(state)=>{ 

    return {
        user:state.userState.user,
    }
}

const mapDispatchToProps = (dispatch)=>({

    postArtcle:(payload)=>dispatch(postArticleAPI(payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(PostModal);