import {React} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineField from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import MyTextfield from './forms/MyTextfield'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'

const Create = () =>{
    
    const defaultValues = {
        name : '',
        comments : '',
        status : '',
    }

    const {handleSubmit, reset, setValue, control} = useForm({defaultValues:defaultValues})
    const submission = (data) => {
        const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
        const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
        AxiosInstance.post(
            `project/ `, {
                name: data.name,
                comments: data.comments,
                start_date: StartDate,
                end_date: EndDate,
            }
        )
    }

    return(
        <div>
            <form onSubmit={handleSubmit(submission)}>

            <Box sx={{display: 'flex', width: '100%', backgroundColor: '#003f', marginBottom: '10px'}}>
                <Typography sx={{backgroundColor: 'rgba(93, 187, 237, 0.47)', marginLeft: '700px'}}>
                    Create records
                </Typography>

            </Box>

            <Box sx={{backgroundColor: 'rgba(213, 213, 213, 1)', boxShadow:3, flexDirection:'column', justifyContent: 'space-around', marginBottom: '40px'}}>
                
                <MyTextfield label="Name" name="name" placeholder="Name project" control={control} width='10%'/>

                <MyDatePickerField label="Start date" name="start_date" control={control}  width='10%'/>

                <MyDatePickerField label="End date" name="end_date" control={control}  width='10%'/>
            </Box>
            <Box>
                <MyMultilineField label="Comment" name="comments" placeholder="Comment this topic" control={control}  width='30%'/>
            </Box>
            <br></br>
            <Box>
                <Button variant='contained' type='submit' sx={{width: '10%'}}>
                    Submit
                </Button>
            </Box>
            </form>
        </div>
    )
}

export default Create