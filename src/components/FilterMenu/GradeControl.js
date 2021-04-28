import { Container, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';

function GradeControl({gradeValue, setGradeValue, grades}){
    return (
        <Container>
            <FormControl style={{width: '100%'}}>
                <InputLabel id="grade-label">Grade</InputLabel>
                <Select 
                    labelId="grade-label"
                    autoWidth={true} 
                    value={gradeValue}
                    onChange={event => setGradeValue(event.target.value)}
                >
                    <MenuItem value="All" selected key="grade-all">All</MenuItem>
                    {grades.map((grade, i) => (<MenuItem value={grade.value} key={`grade-${grade.name}`}>{grade.name}</MenuItem>))}
                </Select>
            </FormControl>
        </Container>
    );
}

export default GradeControl;