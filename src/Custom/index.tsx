import React from 'react';
const Layout = (props: any) => {
  let style = {
    backgroundColor: '#28a8f4',
    color: '#ffffff',
    paddig: '10px',
    margin: '5px',
    padding: '5px',
  };
  return (
    <div>
      <div style={style}>Header</div>
      <div>{props.children}</div>
      <div style={style}>@copyright</div>
    </div>
  );
};
export default Layout;
