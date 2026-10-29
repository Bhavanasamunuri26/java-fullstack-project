import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home(){

    const navigate = useNavigate()

    return(<>
       <div id='home-header'>
           <h2>InkWell</h2>

           <div id='pages'>
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
              <span>Store</span>
           </div>

           <button onClick={()=> navigate("/account")}>Login</button>
       </div>

        
       <hr/>

       <img id="home-image" src="https://cdn.pixabay.com/photo/2015/09/04/23/28/wordpress-923188_1280.jpg"></img>



    </>)
};


export default Home