import React, {Fragment, useState} from 'react'
// Material UI Components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
// Material UI Icons
import { InfoOutlined } from '@material-ui/icons';

const Modal:React.FC = () => {

    const [display, setDisplay] = useState(false);

    return (
        <Fragment>
            <IconButton onClick={() => setDisplay(true)} className="modal-icon">
                <InfoOutlined />
            </IconButton>
            <Dialog open={display} onClose={() => setDisplay(false)} className="modal">
                <DialogTitle title="By Ahmed Faraz" style={{textAlign: 'center'}}>
                    About Quiz App
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1" color="secondary">Developed by <strong>Ahmed Faraz</strong></Typography>
                    <Typography variant="body2" gutterBottom>Developed using <strong>React</strong> and <strong>Typescript</strong></Typography>
                    <Typography variant="h5" color="primary">TECH USED</Typography>
                    <ul>
                        <li><Typography variant="body2" color="secondary">React</Typography></li>
                        <li><Typography variant="body2" color="secondary">Typescript</Typography></li>
                        <li><Typography variant="body2">React Hooks</Typography></li>
                        <li><Typography variant="body2">Custom CSS</Typography></li>
                        <li><Typography variant="body2">Material UI</Typography></li>
                        <li><Typography variant="body2">GitHub</Typography></li>
                        <li><Typography variant="body2">GitHub Actions</Typography></li>
                        <li><Typography variant="body2">Surge</Typography></li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setDisplay(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Modal;