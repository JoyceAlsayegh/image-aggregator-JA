import React,{Component} from 'react';
import { createMuiTheme,MuiThemeProvider, fade, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Search from './Search';
import ImageResult from './ImageResult';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

 const theme = createMuiTheme({
  palette: {
    secondary: {
        main: '#FFA500'
      },
    primary:{
       main:'#000000'
    }
    
    }
  },
)

class NavBar extends Component{
   constructor(props){ 
     super(props);
    this.onUpdatePage = this.onUpdatePage.bind(this); 
    this.state ={
      imagesRes:[],
      page:1,
      searchText:''
    };
  }

  onChangeImage(values){

    this.setState({imagesRes:values});
  };
  
  nextPage = e => {
    const {page} = this.state;
    this.setState({
      page: page+1
    })
  }

  prevPage = e => {
    const {page} = this.state;
    this.setState({
      page: page-1
    })
  };
  onUpdatePage(value){
   this.setState({page:value, imagesRes:[]});
 }
  
  render(){
    const {page} = this.state;
    const {classes } = this.props; 
    if(this.state.page>1){
    return(
      <div className={classes.root}>
      <MuiThemeProvider  theme={theme}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Stock Image Results
            </Typography>
            <div className={classes.search}>
              <Search onChangeUpdateImages={this.onChangeImage.bind(this)} page={page} onUpdatePage ={this.onUpdatePage}/>
            </div>
          </Toolbar>
        </AppBar>
      
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <Button fullWidth color='secondary' variant="outlined" onClick={this.prevPage}>Previous</Button>
        </Grid>      
        
        <Grid item xs={12} sm={6}>
          <Button fullWidth  color='secondary' variant="outlined" onClick={this.nextPage} >Next</Button>
        </Grid>
      </Grid>
      <Grid>
        <Paper>
          <ImageResult images={this.state.imagesRes} />
        </Paper>
      </Grid>
      </MuiThemeProvider>
    </div>
      );
    }else{
      return(
     <div className={classes.root}>
      <MuiThemeProvider  theme={theme}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Stock Image Results
            </Typography>
            <div className={classes.search}>
              <Search onChangeUpdateImages={this.onChangeImage.bind(this)} page={page} onUpdatePage ={this.onUpdatePage}/>
            </div>
          </Toolbar>
        </AppBar>
      
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
         
        </Grid>      
        
        <Grid item xs={12} sm={6}>
          <Button fullWidth  color='secondary' variant="outlined" onClick={this.nextPage} >Next</Button>
        </Grid>
      </Grid>
      <Grid>
        <Paper>
          <ImageResult images={this.state.imagesRes} />
        </Paper>
      </Grid>
      </MuiThemeProvider>
    </div>
      );
    

    }
  };
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(NavBar)