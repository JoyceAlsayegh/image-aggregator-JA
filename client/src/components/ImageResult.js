import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { GridListTileBar } from '@material-ui/core';

const useStyles  = theme => ({
    root: {
      flexGrow: 1,
    },
    picture:{
      padding: 5,
    }
  });

class ImageResult extends Component{
    state ={
        images:[],
        isLoaded: false,
        isEntered:false
      };
     

      render(){
        let imageListContent;
        const {images} = this.props;     
        
        if(images){
          imageListContent =(
              <GridList  cellHeight={160} cols={5}>
                  {images.map(tile=>(
                      <GridListTile id={tile.id} style={{textAlign:"center"}}>
                          <a href={tile.downloadUrl}>
                              <img key={tile.id} height={160} alt=""  src={tile.imageUrl} />
                              <GridListTileBar
                                  title={tile.source}
                                  titlePosition="top"        
                              />
                          </a>
                      </GridListTile>       
                  ))}
              </GridList>
          )
        }else{
          imageListContent =null;
        }
          return(
              <div>{imageListContent}</div>

             )
        }
}
//
ImageResult.propTypes= {
    images: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(ImageResult);