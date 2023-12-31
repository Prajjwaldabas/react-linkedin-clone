import React from 'react'
import styled from 'styled-components'
const RightSide = (props) => {
  return (
    <Container>

<FollowCard>

    <Title>


        <h2>Add to your feed</h2>
        <img src="/images/feed-icon.svg" alt="" />
    </Title>

<FeedList>
    <li>
        <a > 
            <Avatar/>

        </a>
        <div>
            <span>#Linkedin</span>
            <button>Follow</button>
        </div>
    </li>

    <li>
        <a >
        <Avatar/>
        </a>
        <div>
            <span>#Video</span>
            <button>Follow</button>
            
            </div> 
       
    </li>
</FeedList>

<Recommendation>

    View all recomendations

    <img src="/images/right-con.svg" alt="" />
</Recommendation>

</FollowCard>

<BannerCard>
    <img src="https://tse1.mm.bing.net/th?id=OIP.kPRL5kMjbUaYg2ZmUulo5QHaEF&pid=Api&P=0&h=180" alt="" />
</BannerCard>

    </Container>



  )
}

const Container = styled.div`
    
    grid-area: rightside;
`

const FollowCard = styled.div`
    
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
position: relative;
border:none;
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
padding: 12px;
`

const Title = styled.div`
display:inline-flex;
align-items: center;
justify-content: space-between;
font-size :16px;
width: 100%;
color: rgba(0,0,0,0.6);

`

const FeedList = styled.ul`
    margin-top: 16px;

    li{
        display: flex;
align-items: center;
margin: 12px 0 ;
position: relative;
font-size: 14px;

& > div{
    display: flex;
    flex-direction: column;

}

button{
    background-color: transparent;
color: rgba(0,0,0,0.6);
box-shadow: inset 0 0 0 1px rgba(0,0,0,0.6);
border-radius: 15px;
padding: 16px;
box-sizing: border-box;
font-weight: 600;
display: inline-flex;
align-items: center;
justify-content: center;
max-height: 32px;
max-width: 480px;
text-align: center;
outline: none;

}


}


`

const Avatar = styled.div`
  background-image:url('/images/user.svg');
  background-size: contain;
  background-position: center;
  border-radius: 50%;
  background-repeat: no-repeat;
  margin-right:8px;
  width: 48px;
  height: 48px;
  
`

const Recommendation = styled.a`
color:#0a66c2;
display: flex;
align-items: center;
font-size: 14px;

`

const BannerCard= styled(FollowCard)`
  
  img{
    width: 100%;
    height: 100%;

  }   


`



export default RightSide