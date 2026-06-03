import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, TextField } from '@mui/material';


const Header = () => {
    return(
        <div className='header p-4'>
            <div className='header-top mb-4'>
                <div className='d-flex gap-2 align-items-center'>
                    <AssignmentIcon className="fs-2"/>
                    <h1 className='fw-bold fs-2 mb-0'>TODO BOARD</h1>
                </div>
            </div>
            <div className='header-filters d-flex gap-2'>
                <div className='search-box'>
                    <TextField placeholder='Search tasks...' size='small' />
                </div>
                <Button variant='contained'>Priority</Button>
                <Button variant='contained'>Assignee</Button>
                <Button variant='contained'>Tag</Button>
                <Button variant='contained'>Clear Filters</Button>
            </div>
        </div>
    )
}

export default Header;