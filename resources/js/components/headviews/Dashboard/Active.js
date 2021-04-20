import React, {useState, useEffect} from 'react';
import ImageUploader from 'react-images-upload';
import { HEAD_API_BASE_URL, HEAD_APP_URL, USER_ID } from '../../config';
import Loader from "../../assets/img/loader.gif";
import Alert from '@material-ui/lab/Alert';


 import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import DeleteProduct from "./DeleteProduct";





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "70%",
    marginBottom: "40px",
    margin: "auto"
   },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "transparent",
    borderRadius: "5px",
    fontSize: "15px",
    textAlign: "center",
    padding: "5px",
    width: "100%",
    color: "black",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold"
  },
  delete:{
    color: "red",
    marginLeft: "10px"
  },
  visibility: {
    color: "blue"
  },
  cardhead: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: "15px",
  }
}));



export default class Activer extends React.Component {
  state = {
    products: [],
     skip: 0,
     take: 2,
     loader: false
  }


  componentDidMount (){
    let materialboxed = document.querySelectorAll('.materialboxed ');
      M.Materialbox.init(materialboxed, {});
    //Fetching Data for Profile Completion
     $.ajax({ url: HEAD_API_BASE_URL + '/getHeadActiveProducts/?skip='+ this.state.skip +'&take='+ this.state.take, method: "GET", })
     .done( res => { this.setState( prevState => ({ products: res, skip: prevState.skip + 2} ))  })
     .fail( err => { console.log(err) })
  }

  handleFetchMore = (e) => {
    //Fetching Data for Profile Completion
     this.setState({loader: true });
     $.ajax({
       url: HEAD_API_BASE_URL + '/getHeadActiveProducts/?skip='+ this.state.skip +'&take='+ this.state.take, method: "GET",})
     .done( res => { this.setState( prevState => ( {skip: prevState.skip + 2, products: prevState.products.concat(res), loader: false } )); })
     .fail( err => { console.log(err); this.setState( {loader: true })  })
  }
  handleRecheck = (id) => {
    //ReUpdating the Result to Effect the change
    this.setState( prevState => ( prevState.products = this.state.products.filter( val => (val.product_id !== id)) ))
    }

  render(){
    return (
      <>{(this.state.products.length > 0) ?
          <Active products= {this.state.products} loader = {this.state.loader} handleFetchMore = {this.handleFetchMore}  handleRecheck={this.handleRecheck}/> :
        <div> <h5 className="center "> No Item </h5> </div>
        }
     </>
    )
  }
}


function Active(props) {

  const classes = useStyles();
  const [unique, setUnique] = useState(null);
  const [loader, setLoader] = useState(false);



    const handleDecline = (id, ind) => {
      //Fetching Data for Profile Completion
        setLoader(true);
        $.ajax({ url: HEAD_API_BASE_URL + '/setHeadDecline/' + id, method: "POST"  })
        .done( res => { setLoader(false); setUnique(ind); props.handleRecheck(id);  })
        .fail( err => { console.log(err); setLoader(false) })
        };


  const looper =   props.products.map( (val, ind) => (
    <div className="card horizontal" key={ind}>
     <div className="card-image">
       <img className="materialboxed" src={(val.photos !== null) ? (HEAD_APP_URL + '/storage/' + val.photos[0].slice(7)) : Loader }/>
     </div>
     <div className="card-stacked">
       <div className="card-content">
          <div id="submages">
              <ImageLooper  photos = {val.photos} />
          </div>
         <h5>Product ID: { "LB"+ String("00000" + val.product_id).slice(-5)} </h5>
         <h5>Product Name: {val.product_name} </h5>
         <h5>Price: {'N ' + val.product_price} </h5>
         <h5>specification:   {val.specifications}  </h5>

       </div>
       <div className="card-action">
        <a href="#" onClick={()=>{handleDecline(val.product_id, ind)}}>Disapprove</a>
        <DeleteProduct product_id = {val.product_id}/>
        {(loader && unique === ind) ? <img style={{width: "30px"}} className='loader' src={Loader} />: null}
       </div>
     </div>
   </div>
    ))
  return (
    <>
      <div className="col s12 m8" id="reviewer">
        {looper}
      </div>
      <div id="showmore" onClick={props.handleFetchMore}> Show More
        {props.loader ? <img style={{width: "30px"}} className='loader' src={Loader} />: null}
       </div>
    </>

  );
}


function ImageLooper(props) {
    const list = ((props.photos !== null) ? (
        props.photos.map((val, ind) => (
             (ind == 0) ? ( <span  key={ind}> </span>)
           :( <img className="materialboxed" key={ind} src = {(HEAD_APP_URL + '/storage/' + val.slice(7))} alt="san" /> ) )) ): ( <img  alt="san" /> ) )
  return( <> {list} </> )
}
