import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useBoardStore } from '../store/boardStore';


const Header = () => {

    const searchTerm = useBoardStore(
        (state) => state.searchTerm
    );

    const setSearchTerm = useBoardStore(
        (state) => state.setSearchTerm
    );

    const priorityFilter = useBoardStore(
        (state) => state.priorityFilter
    );

    const setPriorityFilter = useBoardStore(
        (state) => state.setPriorityFilter
    );

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
                    <TextField placeholder='Search tasks...' size='small' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <FormControl fullWidth className='dropdown-filter'>
                    <InputLabel id="header-filter">Priority</InputLabel>
                    <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"high"}>High</MenuItem>
                        <MenuItem value={"medium"}>Medium</MenuItem>
                        <MenuItem value={"low"}>Low</MenuItem>
                    </Select>
                </FormControl>
                <Button variant='contained'>Assignee</Button>
                <Button variant='contained'>Tag</Button>
                <Button variant='contained'>Clear Filters</Button>
            </div>
        </div>
    )
}

export default Header;