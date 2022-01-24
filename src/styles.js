const styles= {
    container: {
      backgroundImage: 'linear-gradient(grey, white, grey)',
      padding: '50px 120px',
    },
    screen: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'black',
      borderRadius: '30px',
      marginBottom: '50px',
    },
    floor: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      width: '100%',
      padding: '30px 0 0 0'
    },
    floorNumber: {
      height: '100px',
      width: '100px',
      backgroundImage: 'url(/floor2.png)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    content: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '40px',
    },
    button: {
      backgroundImage: 'linear-gradient(to right, darkGrey, darkGrey, white)',
      border: '15px double #7d7d7d',
      height: '150px',
      width: '150px',
      borderRadius: '50%',
    },
    text: {
      fontSize: '70px',
      fontWeight: '800',
      color: '#404040'
    },
    actionButtons:{
      height: '100px',
      width: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    verticalLign: {
      borderLeft: '6px solid #404040',
      height: '60px',
      marginRight: '3px',
      marginLeft: '3px',
    },
    arrowRight: {
      width: 0,
      height: 0,
      borderTop: '30px solid transparent',
      borderBottom: '30px solid transparent',
      borderLeft: '30px solid #404040'
    },
    arrowLeft: {
      width: 0,
      height: 0,
      borderTop: '30px solid transparent',
      borderBottom: '30px solid transparent',
      borderRight: '30px solid #404040',
    },
    arrowUp: {
      width: 0,
      height: 0,
      borderLeft: '30px solid transparent',
      borderRight: '30px solid transparent',
      borderBottom: '30px solid green',
    },
    alert: {
      width: '100%',
      fontFamily: 'courier,fixed',
      fontSize: '35px',
      color: 'red',
      padding: '30px 0px 30px 30px'
    },
  }

  export default styles
  