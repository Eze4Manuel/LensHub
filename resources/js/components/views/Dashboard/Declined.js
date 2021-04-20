import React, {useState, useEffect} from 'react';
import ImageUploader from 'react-images-upload';
import { API_BASE_URL, APP_URL, USER_ID } from '../../config';
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

function Declined(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (e) => {
    console.log(e);
  };

  useEffect(()=>{

  })

  const looper =   props.products.map( (val, ind) => (
      <Card className={classes.root} key={ind} styles={{maxWidth: "70%!important", marginLeft: "auto!important"}}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              { "LB"+ String("00000" + val.product_id).slice(-5)}
            </Avatar>
          }
           action={
            <IconButton aria-label="settings">
             </IconButton>
          }
          title={val.product_name}
          subheader={'N ' + val.product_price}
        />
        <CardMedia
          className={classes.media}
          image={(val.photos !== null) ? (APP_URL + '/storage/' + val.photos[0].slice(7)) : Loader }
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {val.specifications}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>


        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
          <Typography paragraph>Category:{" " + val.category}</Typography>
          <Typography paragraph>Condition:{" " + val.condition}</Typography>
          <Typography paragraph>Location:{" " + val.location}</Typography>
          <Typography paragraph>Negotiable:{" " + val.negotiable}</Typography>
          <Typography paragraph>Address: {" " + val.address} </Typography>
          <Typography paragraph>LGA: {" " + val.lga}</Typography>
          <Typography paragraph>Account Name: {" " + val.account_name}</Typography>
          <Typography paragraph>Account Number: {" " + val.account_number} </Typography>
          <Typography paragraph>Bank: {" " + val.bank}</Typography>
          <div id="submages">
              <ImageLooper  photos = {val.photos} />
          </div>
          </CardContent>
        </Collapse>

        <DeleteProduct product_id = {val.product_id}/>

      </Card>
    ))
  return (
    <>
      {looper}
      <div id="showmore" onClick={props.handleFetchMore}> Show More
        {props.loader ? <img className='loader' src={Loader} />: null}
       </div>
    </>

  );
}


function ImageLooper(props) {
    const list = ((props.photos !== null) ? (
        props.photos.map((val, ind) => (
             (ind == 0) ? (

               <span  key={ind}> </span>
             )
           :(
               <img key={ind} src = {(APP_URL + '/storage/' + val.slice(7))} alt="san" />
             )
         ))
      ):
        ( <img  alt="san" /> ) )


  return(
    <>
      {list}
    </>
  )
}





export default class Decliner extends React.Component {
  state = {
    products: [],
     skip: 0,
     take: 2,
     loader: false

  }

componentDidMount (){
  //Fetching Data for Profile Completion
   $.ajax({
     url: API_BASE_URL + '/getDeclinedProducts/'+ USER_ID+'?skip='+ this.state.skip +'&take='+ this.state.take,
     method: "GET",
   })
   .done( res => {
       this.setState( prevState => ({
           products: res,
           skip: prevState.skip + 2,
        }
       ));
    })
   .fail( err => { console.log(err) })
}


     handleFetchMore = (e) => {
       //Fetching Data for Profile Completion
        this.setState({loader: true });
        $.ajax({
          url: API_BASE_URL + '/getDeclinedProducts/'+ USER_ID+'?skip='+ this.state.skip +'&take='+ this.state.take,
          method: "GET",
        })
        .done( res => {
           this.setState( prevState => (
             {
                    skip: prevState.skip + 2,
                    products: prevState.products.concat(res),
                    loader: false
             }
            ));
        })
        .fail( err => { console.log(err);
          this.setState( {loader: true });
          })
     }

  render(){
    return (
      <>{(this.state.products.length > 0) ?
        <Declined products= {this.state.products} loader = {this.state.loader} handleFetchMore = {this.handleFetchMore} /> :
        <div> <h5 className="center "> No Item </h5> </div>
        }
     </>
    )
  }
}
