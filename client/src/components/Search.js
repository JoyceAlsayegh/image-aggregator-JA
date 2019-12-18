import React,{Component} from 'react';
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { orange, grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = theme => ({
  margin: {
    float: 'right',
    right: 10,
    top: 5,
    color: orange[500],
    '&:hover': {
      backgroundColor: '#FFFFFF',
      borderColor: grey[900],
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

class Search extends Component{
    
  state ={
    searchText: ``,
    images:[],
    isLoaded: false,
    isEntered:false,
    page:1,
    isChanged:false
  };
  onTextChange = e => {
    this.setState({[ e.target.name]:e.target.value});
    this.props.onUpdatePage(1);
  };
  handleKeyUp = e =>{
    if(e.key==='Enter' && e.target.value!==``){
      this.setState({searchText:e.target.value, isEntered:true},() =>{
        fetch(`/${this.state.searchText}/${this.state.page}`)
          .then(res => res.json())
          .then(images => this.setState({images}, () => {
            this.props.onChangeUpdateImages(this.state.images);
            this.setState({isLoaded:true, isEntered :false});
          }));
      });
    }else{
      this.setState({isLoaded:false , isEntered:false});
    }
  };

  componentDidUpdate = (prevProps, prevState) => { 

    if (prevProps.page !== this.props.page){
      this.sendSubmit();
    }
  }

  sendSubmit = e =>{
    
    const pageSelected = this.props.page;
    if(this.state.SearchText!==``){
      this.setState({isEntered:true},() =>{
          fetch(`/${this.state.SearchText}/${pageSelected}`)
            .then(res => res.json())
            .then(images => this.setState({images}, () => {
              this.props.onChangeUpdateImages(this.state.images);
              this.setState({isLoaded:true, isEntered :false});
            }));
          });
      
    
    }else{
        this.setState({isLoaded:false , isEntered:false});
    }
    
  };    
  render(){
    const {classes} =this.props;
    return(
        <div>
           <IconButton  className={classes.searchIcon} onClick={this.sendSubmit}>
              <SearchIcon  />
            </IconButton>
          <InputBase
            name="SearchText"
            defaultvalue = {this.props.searchText}
            onKeyUp={this.handleKeyUp}
            onChange ={this.onTextChange}
            inputProps={{'aria-label':'search'}}
            placeholder ="Search for Images"
          />
          
        </div>
    )
};
}
Search.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Search);