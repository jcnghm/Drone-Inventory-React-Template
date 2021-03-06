import React from 'react';

// Imports for Styling
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import drone_image from '../../assets/images/sample_drone_image.jpg';

import { Link } from 'react-router-dom';
import { AuthCheck } from 'reactfire'; // New Import
import { Suspense } from 'react';

interface Props{
    title: string;
}

// New Make Styles Code
const useStyles = makeStyles({
    root: {
        padding: '0',
        margin: '0'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'centered'
    },
    logo: {
        margin: '0, 0, 0, 0.45rem'
    },
    logo_a: {
        color: 'rgb(28,24,22)'
    },
    logo_navigation: {
        listStyle: 'none',
        textTransformation: 'uppercase',
        textDecoration: 'none'
    },
    navigation: {
        display: 'flex'
    },
    nav_a: {
        display: 'block',
        padding: '1em',
        color: 'black'
    },
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${drone_image});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute'
    },
    main_text: {
        textAlign: 'center',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white'
    }
})

export const Home = ( props:Props) => {

    // New classes variable code
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Nav Bar */}
            <nav>
                <div className={classes.navbar_container}>
                    <h1 className={ `${classes.logo} `}>
                        <a href="#" className={ `${classes.logo_a} ${classes.logo_navigation}` }>Drone Inventory</a>
                    </h1>
                    <ul className={ `${classes.navigation} ${classes.logo_navigation}` }>
                        <li>
                            <Link to="/" className={classes.nav_a}>Home</Link>
                        </li>
                        <Suspense fallback={'loading...'}>
                            <AuthCheck fallback={
                            <li>
                                <Link to="/signin" className={classes.nav_a}>Sign In</Link>
                            </li>
                            }>
                        
                            <li>
                                <Link to="/dashboard" className={classes.nav_a}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/signin" className={classes.nav_a}>Sign Out</Link>
                            </li>
                            </AuthCheck>
						</Suspense>
                    </ul>
                </div>
            </nav>

            {/* Main Home Section */}
            <main className={classes.main}>
                <div className={classes.main_text}>
                    <h1>{ props.title }</h1>
                    <p>Document and store a full inventory of your drone collection.</p>
                    <Button color='primary' variant="contained">View Dashboard</Button>
                </div>
            </main>
        </div>
    )
}