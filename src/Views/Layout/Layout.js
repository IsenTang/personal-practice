import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import {
   Root,
   Header,
   Sidebar,
   Content,
   Footer,
   SidebarTrigger,
   SidebarTriggerIcon,
} from '@mui-treasury/layout';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Button,Toolbar,List,ListItem,ListItemIcon,ListItemText,ListSubheader,CssBaseline,Typography } from '@material-ui/core';
import { Label,
   Brightness4Outlined,
   Brightness7Outlined,
   MusicNote
} from '@material-ui/icons';
import { createMuiTheme } from '@material-ui/core/styles';
import intl from 'react-intl-universal';
import moment from 'moment';

import { get,set } from '../../Common/utils';
import './layout.scss';

const useStyles = makeStyles(() => ({
   root: {
      flexGrow : 1
   },
   content: {

   },
   title:{
      flexGrow : 1,
   }
}));

function Layout ({ children }) {

   const styles = useStyles();

   const dispatch = useDispatch();

   const [ themeType,setThemeType ] = useState(get('theme') || 'light');

   const customTheme = createMuiTheme({
      palette: {
         type: themeType,
      },
   });

   /* 切换主题 */
   const changeTheme = ()=>{

      const type = themeType === 'light' ? 'dark' : 'light';

      set('theme',type);

      setThemeType( type );
   };

   return (
      <Box
         height={ '100vh' }
         display={ 'flex' }
         flexDirection={ 'column' }
         overflow={ 'hidden' }
      >
         <Root initialOpened theme={ customTheme } className={ styles.root }>
            {({ headerStyles }) => (
               <>
                  <CssBaseline />
                  <Header>
                     <Toolbar>
                        <SidebarTrigger className={ headerStyles.leftTrigger } edge="start">
                           <SidebarTriggerIcon/>
                        </SidebarTrigger>
                        <Typography variant="h6" className={ styles.title }>
                           { intl.get('personal-practice') }
                        </Typography>

                        {/* 黑暗模式切换 */}
                        <Button color="inherit" edge="end" onClick={ changeTheme }>

                           { themeType === 'light' ? <Brightness4Outlined/> : <Brightness7Outlined/>}

                        </Button>
                     </Toolbar>
                  </Header>

                  <Sidebar >
                     <List component='nav'
                        subheader={
                           <ListSubheader component="div" id='nested-list-subheader'>
                              {intl.get('directory')}
                           </ListSubheader>
                        }
                     >
                        {/* 标签云 */}
                        <ListItem button>
                           <ListItemIcon>
                              <Label />
                           </ListItemIcon>
                           <ListItemText primary={ intl.get('tag-cloud') } />
                        </ListItem>

                        {/* 打鼓页面 */}
                        <ListItem button onClick={ ()=>{ dispatch(push('/drumkit'));} }>
                           <ListItemIcon>
                              <MusicNote />
                           </ListItemIcon>
                           <ListItemText primary={ intl.get('drum-kit') } />
                        </ListItem>

                     </List>
                  </Sidebar>

                  <Content style={{ height : '100%' }}>
                     {children}
                  </Content>

                  <Footer>
                     <div className='footer'> <Typography> Isen - { moment().year() }</Typography></div>
                  </Footer>
               </>
            )}
         </Root>
      </Box>
   );
}

Layout.propTypes = {
   children: PropTypes.any
};

export default Layout;