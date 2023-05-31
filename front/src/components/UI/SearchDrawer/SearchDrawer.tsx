// import { useState } from 'react';
// import { Box, Button, SwipeableDrawer } from '@mui/material';
//
// const SearchDrawer = () => {
//   const [state, setState] = useState<boolean>({ top: false });
//
//   const toggleDrawer = (anchor: 'top', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
//     if (
//       event &&
//       event.type === 'keydown' &&
//       ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
//     ) {
//       return;
//     }
//
//     setState({ ...state, ['top']: open });
//   };
//
//   const list = (anchor: Anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       asdasdasdasd
//     </Box>
//   );
//
//   return (
//     <>
//       <Button onClick={toggleDrawer('top', true)}>Search</Button>
//       <SwipeableDrawer
//         anchor={'top'}
//         open={state['top']}
//         onClose={toggleDrawer('top', false)}
//         onOpen={toggleDrawer('top', true)}
//       >
//         {list('top')}
//       </SwipeableDrawer>
//     </>
//   );
// };
//
// export default SearchDrawer;
