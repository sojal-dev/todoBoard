import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, TextField } from '@mui/material';
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

    const assigneeFilter = useBoardStore(
        (state) => state.assigneeFilter
    );

    const setAssigneeFilter = useBoardStore(
        (state) => state.setAssigneeFilter
    );

    const tagFilter = useBoardStore(
        (state) => state.tagFilter
    );

    const setTagFilter = useBoardStore(
        (state) => state.setTagFilter
    );  

    const clearFilters = useBoardStore(
        (state) => state.clearFilters
    );

    const sortBy = useBoardStore(
        (state) => state.sortBy
    );
    
    const setSortBy = useBoardStore(
        (state) => state.setSortBy
    );

    return(
        <div className='header p-4'>
            <div className='header-top mb-4'>
                <div className='d-flex gap-2 align-items-center'>
                    <AssignmentIcon className="fs-2"/>
                    <h1 className='fw-bold fs-2 mb-0'>SPRINTDESK</h1>
                </div>
            </div>
            <div className='header-filters d-flex gap-3'>
                <div className='search-box'>
                    <TextField placeholder='Search tasks...' size='small' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className='filter-wrapper d-flex gap-2 align-items-center'>
                <label>Priority:</label>
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className='dropdown-filter'>
                    <option value={""}>All</option>
                    <option value={"high"}>High</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"low"}>Low</option>
                </select>
                </div>
                <div className='filter-wrapper d-flex gap-2 align-items-center'>
                    <label>Assignee:</label>
                    <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)} className='dropdown-filter'>
                        <option value={""}>All</option>
                        <option value={"sojal-saini"}>Sojal Saini</option>
                        <option value={"harsh-dhiman"}>Harsh Dhiman</option>
                        <option value={"rishi-saini"}>Rishi Saini</option>
                    </select>
                </div>
                <div className='filter-wrapper d-flex gap-2 align-items-center'>
                    <label>Tag:</label>
                    <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className='dropdown-filter'>
                        <option value={""}>All</option>
                        <option value={"frontend"}>Frontend</option>
                        <option value={"backend"}>Backend</option>
                        <option value={"bug"}>Bug</option>
                        <option value={"client-dependency"}>Client Dependency</option>
                    </select>
                </div>
                <div className='filter-wrapper d-flex gap-2 align-items-center'>
                    <label>Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='dropdown-filter'>
                        <option value={"default"}>Default</option>
                        <option value={"priority"}>Priority</option>
                        <option value={"dueDate"}>Due Date</option>
                    </select>
                </div>
                <Button variant='contained' onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>
        </div>
    )
}

export default Header;