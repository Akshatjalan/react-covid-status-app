import React from 'react';
import { Card, CardContent, Typography} from "@material-ui/core";
import './StatsBox.css';

function StatsBox({title, cases, total}) {
    return (
        <Card className="statsBox">
            <CardContent>
                <Typography className="statsBox_title" >
                  <center>  {title}</center> 
                </Typography>

                <h2 className="statsBox_cases">
                <center>  {cases}</center> 
                </h2>

                <Typography className="statsBox_total" color="textSecondary">
                <center>  {total} Total </center> 
                </Typography>
            </CardContent>
        </Card>
    )
}

export default StatsBox;
